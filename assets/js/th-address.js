/* Yaiya — Thailand address autofill.
   Data: assets/data/th-address.json (provinces/districts/subdistricts + zip codes,
   trimmed from kongvut/thai-province-data, MIT). Loaded once and cached.

   Usage: initThaiAddress({ provinceSelect, districtInput, districtList, subInput, subList, zipInput })
   Wires up: picking a province narrows the district datalist; picking a district narrows the
   subdistrict datalist; picking a subdistrict auto-fills district, province and zip code.
   Everything still stays a plain, editable text input — nothing is locked. */

const THAI_ADDRESS_DATA_URL = "assets/data/th-address.json";
let _thaiAddressPromise = null;

function loadThaiAddressData() {
  if (!_thaiAddressPromise) {
    _thaiAddressPromise = fetch(THAI_ADDRESS_DATA_URL)
      .then((res) => { if (!res.ok) throw new Error(`Failed to load ${THAI_ADDRESS_DATA_URL} (${res.status})`); return res.json(); })
      .then((data) => {
        const provincesById = new Map(data.provinces.map((p) => [p.id, p]));
        const districtsById = new Map(data.districts.map((d) => [d.id, d]));
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
        return { ...data, provincesById, districtsById, districtsByProvince, subsByDistrict };
      });
  }
  return _thaiAddressPromise;
}

const thLabel = (rec) => `${rec.th} (${rec.en})`;

function fillDatalist(listEl, records) {
  listEl.innerHTML = records.map((r) => `<option value="${thLabel(r).replace(/"/g, "&quot;")}"></option>`).join("");
}

/* Finds the record whose "Thai (English)" label exactly matches the input's current value,
   scoped to `pool` when given (keeps duplicate place-names across provinces from colliding). */
function matchByLabel(value, pool) {
  const v = value.trim();
  if (!v) return null;
  return pool.find((r) => thLabel(r) === v) || null;
}

async function initThaiAddress(fields) {
  const { provinceSelect, districtInput, districtList, subInput, subList, zipInput } = fields;
  const data = await loadThaiAddressData();

  const sortedProvinces = [...data.provinces].sort((a, b) => a.th.localeCompare(b.th, "th"));
  provinceSelect.innerHTML =
    '<option value="">-- เลือกจังหวัด / Select province --</option>' +
    sortedProvinces.map((p) => `<option value="${p.id}">${p.th} (${p.en})</option>`).join("");

  function districtsFor(provinceId) {
    return provinceId ? (data.districtsByProvince.get(+provinceId) || []) : data.districts;
  }
  function subsFor(districtId) {
    return districtId ? (data.subsByDistrict.get(+districtId) || []) : [];
  }

  function refreshDistrictList() {
    fillDatalist(districtList, districtsFor(provinceSelect.value));
  }
  function refreshSubList(districtId) {
    fillDatalist(subList, subsFor(districtId));
  }

  // Province chosen directly → narrow the district options; clear any district/subdistrict/zip
  // that no longer matches the new province, so nothing stale is left behind silently.
  provinceSelect.addEventListener("change", () => {
    const stillValid = matchByLabel(districtInput.value, districtsFor(provinceSelect.value));
    if (!stillValid) {
      districtInput.value = "";
      subInput.value = "";
      zipInput.value = "";
      fillDatalist(subList, []);
    }
    refreshDistrictList();
  });

  // District typed/selected → if it's an exact match, auto-fill province + narrow subdistricts
  // (clearing the subdistrict/zip if they belonged to a different district).
  districtInput.addEventListener("input", () => {
    const pool = districtsFor(provinceSelect.value);
    const match = matchByLabel(districtInput.value, pool.length ? pool : data.districts);
    if (!match) return;
    provinceSelect.value = String(match.province_id);
    refreshDistrictList();
    if (!matchByLabel(subInput.value, subsFor(match.id))) {
      subInput.value = "";
      zipInput.value = "";
    }
    refreshSubList(match.id);
  });

  // Subdistrict typed/selected → the seamless part: auto-fill district, province and zip.
  subInput.addEventListener("input", () => {
    const currentDistrict = matchByLabel(districtInput.value, districtsFor(provinceSelect.value));
    const scoped = currentDistrict ? subsFor(currentDistrict.id) : data.subdistricts;
    const match = matchByLabel(subInput.value, scoped);
    if (!match) return;
    const district = data.districtsById.get(match.district_id);
    if (district) {
      districtInput.value = thLabel(district);
      provinceSelect.value = String(district.province_id);
      refreshDistrictList();
      refreshSubList(district.id);
    }
    zipInput.value = match.zip;
  });

  // Typing a 5-digit zip that uniquely identifies one subdistrict fills in the rest too.
  zipInput.addEventListener("input", () => {
    const v = zipInput.value.trim();
    if (!/^\d{5}$/.test(v)) return;
    const matches = data.subdistricts.filter((s) => String(s.zip) === v);
    if (matches.length !== 1) return;
    const [sub] = matches;
    const district = data.districtsById.get(sub.district_id);
    subInput.value = thLabel(sub);
    if (district) {
      districtInput.value = thLabel(district);
      provinceSelect.value = String(district.province_id);
      refreshDistrictList();
      refreshSubList(district.id);
    }
  });

  refreshDistrictList();
}
