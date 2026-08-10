/* Yaiya — Thailand address picker.
   Data: assets/data/th-address.json (provinces/districts/subdistricts + zip codes,
   trimmed from kongvut/thai-province-data, MIT). Loaded once and cached.

   Usage: initThaiAddress({ provinceSelect, districtSelect, subSelect, zipInput })

   Three linked <select> dropdowns — province → district (อำเภอ/เขต) → subdistrict (ตำบล/แขวง)
   — each populated from the one before it, with the postal code filled in automatically once
   a subdistrict is chosen. Selects (rather than <input list="...">/<datalist>) because mobile
   browsers handle datalist inconsistently: on several Android/iOS browsers the suggestion list
   never appears, leaving what looks like a plain text box with 7,000-odd valid answers.

   Every programmatic change goes through setVal(), which fires a real "input" event — that's
   what lets checkout.html's progressive step-reveal react to fields it didn't type into. */

const THAI_ADDRESS_DATA_URL = "assets/data/th-address.json";
let _thaiAddressPromise = null;

function loadThaiAddressData() {
  if (!_thaiAddressPromise) {
    _thaiAddressPromise = fetch(THAI_ADDRESS_DATA_URL)
      .then((res) => { if (!res.ok) throw new Error(`Failed to load ${THAI_ADDRESS_DATA_URL} (${res.status})`); return res.json(); })
      .then((data) => {
        const districtsByProvince = new Map();
        data.districts.forEach((d) => {
          if (!districtsByProvince.has(d.province_id)) districtsByProvince.set(d.province_id, []);
          districtsByProvince.get(d.province_id).push(d);
        });
        const subsByDistrict = new Map();
        data.subdistricts.forEach((s) => {
          if (!subsByDistrict.has(s.district_id)) subsByDistrict.set(s.district_id, []);
          subsByDistrict.get(s.district_id).push(s);
        });
        const subsById = new Map(data.subdistricts.map((s) => [s.id, s]));
        return { ...data, districtsByProvince, subsByDistrict, subsById };
      });
  }
  return _thaiAddressPromise;
}

const thLabel = (rec) => `${rec.th} (${rec.en})`;
const byThaiName = (a, b) => a.th.localeCompare(b.th, "th");

/* Rebuilds a dropdown. Disabled while empty, so it reads as "not ready yet" rather than
   looking like a working control with nothing in it. */
function fillSelect(sel, records, placeholder) {
  const opts = records.map((r) => `<option value="${r.id}">${thLabel(r)}</option>`).join("");
  sel.innerHTML = `<option value="">${placeholder}</option>${opts}`;
  sel.value = "";
  sel.disabled = records.length === 0;
}

function setVal(el, val) {
  if (el.value === val) return;
  el.value = val;
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

async function initThaiAddress(fields) {
  const { provinceSelect, districtSelect, subSelect, zipInput } = fields;
  const data = await loadThaiAddressData();

  const PLACEHOLDER = {
    province: "-- เลือกจังหวัด / Select province --",
    district: "-- เลือกอำเภอ/เขต / Select district --",
    sub: "-- เลือกตำบล/แขวง / Select subdistrict --"
  };

  fillSelect(provinceSelect, [...data.provinces].sort(byThaiName), PLACEHOLDER.province);
  fillSelect(districtSelect, [], PLACEHOLDER.district);
  fillSelect(subSelect, [], PLACEHOLDER.sub);

  // Province chosen → load its districts, and clear anything downstream that no longer applies
  provinceSelect.addEventListener("change", () => {
    const districts = provinceSelect.value
      ? [...(data.districtsByProvince.get(+provinceSelect.value) || [])].sort(byThaiName)
      : [];
    fillSelect(districtSelect, districts, PLACEHOLDER.district);
    fillSelect(subSelect, [], PLACEHOLDER.sub);
    setVal(zipInput, "");
  });

  // District chosen → load its subdistricts
  districtSelect.addEventListener("change", () => {
    const subs = districtSelect.value
      ? [...(data.subsByDistrict.get(+districtSelect.value) || [])].sort(byThaiName)
      : [];
    fillSelect(subSelect, subs, PLACEHOLDER.sub);
    setVal(zipInput, "");
  });

  // Subdistrict chosen → that pins down the postal code (still editable, for the rare
  // subdistrict that spans more than one)
  subSelect.addEventListener("change", () => {
    const sub = subSelect.value ? data.subsById.get(+subSelect.value) : null;
    setVal(zipInput, sub ? String(sub.zip) : "");
  });
}
