// src/admin/CollegeAdd.tsx
import React, { useState } from "react";

/* ---------------------------
   TYPES
----------------------------*/
type DegreeType = "B.Tech" | "M.Tech" | "BSc" | "MSc" | "MBA" | "Other" | "";

interface Course {
  courseID: string;
  courseName: string;
  stream: string;
  degreeType: DegreeType;
  durationYears: number | "";
  feesAnnual: number | "";
  feesTotal?: number | "";
  eligibilityCriteria: string;
  entranceExams: string; // CSV
  seatsAvailable: number | "";
  courseHighlights: string;
  syllabusLink: string;
}

interface Ranking {
  agency: string;
  year: number | "";
  rank: number | "";
  category: string;
}

interface Cutoff {
  examName: string;
  year: number | "";
  round: number | "";
  courseName: string;
  cutoffRankOrPercentile: string;
  category: string;
}

interface Admission {
  admissionYear: number | "";
  applicationStartDate: string; // ISO date
  applicationEndDate: string;
  processDescription: string;
  requiredDocuments: string; // CSV or newline
  applicationLink: string;
  importantDates: string;
  admissionStatus: "Open" | "Closed" | "Upcoming" | "";
}

interface Placement {
  placementYear: number | "";
  placementRatePercent: number | "";
  averagePackage: number | "";
  highestPackage: number | "";
  topRecruiters: string[]; // array of names
  highlights: string;
}

interface Faculty {
  facultyID: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experienceYears: number | "";
}

interface Scholarship {
  scholarshipName: string;
  eligibility: string;
  amountOrBenefit: string;
  applicationProcedure: string;
  deadline: string; // ISO date
}

interface CollegeData {
  // Basic
  collegeID: string;
  collegeName: string;
  establishedYear: number | "";
  collegeType: string;
  ownership: string;
  affiliatedUniversity: string;
  description: string;
  logoURL: string;
  brochureLink: string;
  // Location
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  // Contact
  officialEmail: string;
  phoneNumber: string;
  websiteURL: string;
  socialLinks: string[]; // list of urls
  // Collections
  courses: Course[];
  rankings: Ranking[];
  cutoffs: Cutoff[];
  admission: Admission;
  placements: Placement[];
  faculty: Faculty[];
  scholarships: Scholarship[];
  gallery: string[]; // urls
  facilities: string[]; // list
}

/* ---------------------------
   SANITIZE + VALIDATORS
----------------------------*/

const sanitize = (v: string) =>
  v
    .replace(/[<>]/g, "") // remove HTML tags to prevent XSS
    .replace(/[\u0000-\u001F\u007F]/g, "") // control chars
    .trim();


const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const isURL = (v: string) =>
  /^(https?:\/\/)?([^\s.]+\.\S{2}|localhost)(:\d+)?(\/\S*)?$/.test(v.trim());

const toNumberOrEmpty = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : "";
};

/* ---------------------------
   DEFAULTS
----------------------------*/
const defaultCourse = (): Course => ({
  courseID: "",
  courseName: "",
  stream: "",
  degreeType: "",
  durationYears: "",
  feesAnnual: "",
  feesTotal: "",
  eligibilityCriteria: "",
  entranceExams: "",
  seatsAvailable: "",
  courseHighlights: "",
  syllabusLink: "",
});

const defaultFaculty = (): Faculty => ({
  facultyID: "",
  name: "",
  designation: "",
  department: "",
  qualification: "",
  experienceYears: "",
});

const defaultRanking = (): Ranking => ({ agency: "", year: "", rank: "", category: "" });
const defaultCutoff = (): Cutoff => ({
  examName: "",
  year: "",
  round: "",
  courseName: "",
  cutoffRankOrPercentile: "",
  category: "",
});
const defaultPlacement = (): Placement => ({
  placementYear: "",
  placementRatePercent: "",
  averagePackage: "",
  highestPackage: "",
  topRecruiters: [],
  highlights: "",
});
const defaultScholarship = (): Scholarship => ({
  scholarshipName: "",
  eligibility: "",
  amountOrBenefit: "",
  applicationProcedure: "",
  deadline: "",
});

/* ---------------------------
   COMPONENT
----------------------------*/
const CollegeAdd: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  const [form, setForm] = useState<CollegeData>({
    collegeID: "",
    collegeName: "",
    establishedYear: "",
    collegeType: "",
    ownership: "",
    affiliatedUniversity: "",
    description: "",
    logoURL: "",
    brochureLink: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    officialEmail: "",
    phoneNumber: "",
    websiteURL: "",
    socialLinks: [""],
    courses: [defaultCourse()],
    rankings: [defaultRanking()],
    cutoffs: [defaultCutoff()],
    admission: {
      admissionYear: "",
      applicationStartDate: "",
      applicationEndDate: "",
      processDescription: "",
      requiredDocuments: "",
      applicationLink: "",
      importantDates: "",
      admissionStatus: "",
    },
    placements: [defaultPlacement()],
    faculty: [defaultFaculty()],
    scholarships: [defaultScholarship()],
    gallery: [""],
    facilities: [""],
  });

  /* Generic setter with sanitization for strings */
  const setField = <K extends keyof CollegeData>(key: K, value: CollegeData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* For nested arrays: update element at index */
  const updateArrayItem = <T, K extends keyof CollegeData & string>(
    key: K,
    index: number,
    updater: (old: any) => any
  ) => {
    const arr = [...(form[key] as any[])];
    arr[index] = updater(arr[index]);
    setField(key, arr as any);
  };

  const addArrayItem = (key: keyof CollegeData, item: any) => {
    setField(key, [...(form[key] as any[]), item] as any);
  };

  const removeArrayItem = (key: keyof CollegeData, index: number) => {
    const arr = [...(form[key] as any[])];
    arr.splice(index, 1);
    setField(key, arr as any);
  };

  /* Validation for current step */
  const validateStep = (s: number): { ok: boolean; errors?: string[] } => {
    const errors: string[] = [];
    if (s === 1) {
      if (!form.collegeName.trim()) errors.push("College name is required.");
      if (form.establishedYear && typeof form.establishedYear !== "number")
        errors.push("Established year must be a number.");
      if (form.officialEmail && !isEmail(form.officialEmail)) errors.push("Official email invalid.");
      if (form.websiteURL && !isURL(form.websiteURL)) errors.push("Website URL invalid.");
    }
    if (s === 4) {
      // courses
      form.courses.forEach((c, i) => {
        if (!c.courseName.trim()) errors.push(`Course ${i + 1}: name required.`);
        if (c.durationYears !== "" && typeof c.durationYears !== "number")
          errors.push(`Course ${i + 1}: duration must be numeric.`);
      });
    }
    // you can add more step-specific validation here
    return { ok: errors.length === 0, errors };
  };

  /* CSV export - nested objects serialized as JSON in a single cell */
  const exportCSV = () => {
    // deep sanitize
    function deepSan(v: any): any {
      if (typeof v === "string") return sanitize(v);
      if (Array.isArray(v)) return v.map(deepSan);
      if (v && typeof v === "object") {
        const out: any = {};
        for (const k of Object.keys(v)) out[k] = deepSan(v[k]);
        return out;
      }
      return v;
    }
    const safe = deepSan(form);
    // create one CSV row: header = keys, value = JSON string
    const headers = Object.keys(safe).join(",");
    const values = Object.values(safe)
      .map((v) => {
        // for primitives, convert to string; for objects/arrays serialize JSON
        const cell = typeof v === "object" ? JSON.stringify(v) : String(v ?? "");
        return `"${cell.replace(/"/g, '""')}"`;
      })
      .join(",");
    const csv = `${headers}\n${values}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = sanitize(form.collegeName || "college") || "college";
    a.download = `${name}_details.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Saved locally as CSV (sanitized).");
  };

  /* Navigation */
  const next = () => {
    const res = validateStep(step);
    if (!res.ok) {
      setMessage(res.errors?.join(" ") || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setMessage("");
    setStep((s) => Math.min(s + 1, 10));
  };
  const prev = () => {
    setMessage("");
    setStep((s) => Math.max(s - 1, 1));
  };

  /* submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // final validation (quick)
    const res = validateStep(step);
    if (!res.ok) {
      setMessage(res.errors?.join(" ") || "");
      return;
    }
    exportCSV();
  };

  /* FIX: Removed custom TextInput component entirely. 
    Using native <input> elements inline to prevent focus loss 
    due to component re-rendering issues.
  */

  /* Layout wrapper: scrollable */
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6 overflow-y-auto max-h-[85vh]">
        <h1 className="text-2xl font-semibold mb-3">Add College (Step {step}/10)</h1>

        {/* progress */}
        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div
            className="h-2 bg-blue-600 rounded transition-all"
            style={{ width: `${(step / 10) * 100}%` }}
          />
        </div>

        {message && <div className="text-red-600 mb-3">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* STEP 1 - BASIC */}
          {step === 1 && (
            <>
              <h2 className="text-lg font-medium mb-2">Basic Details</h2>
              
              {/* College ID - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">College ID</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.collegeID}
                      onChange={(e) => setField("collegeID", sanitize(e.target.value))} 
                  />
              </label>

              {/* College Name - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">College Name *</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.collegeName}
                      onChange={(e) => setField("collegeName", sanitize(e.target.value))} 
                  />
              </label>

              {/* Established Year - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Established Year</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="number"
                      placeholder="e.g. 1998"
                      value={String(form.establishedYear)}
                      onChange={(e) => setField("establishedYear", toNumberOrEmpty(sanitize(e.target.value)))}
                  />
              </label>
              
              {/* College Type - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">College Type</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.collegeType}
                      onChange={(e) => setField("collegeType", sanitize(e.target.value))} 
                  />
              </label>
              
              {/* Ownership - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Ownership</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.ownership}
                      onChange={(e) => setField("ownership", sanitize(e.target.value))} 
                  />
              </label>
              
              {/* Affiliated University - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Affiliated University</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.affiliatedUniversity}
                      onChange={(e) => setField("affiliatedUniversity", sanitize(e.target.value))} 
                  />
              </label>

              {/* Description - Native Textarea (working field) */}
              <label className="block mb-3">
                <div className="text-sm text-gray-700 mb-1">Description</div>
                <textarea
                  className="w-full border rounded p-2 text-sm"
                  value={form.description}
                  onChange={(e) => setField("description", sanitize(e.target.value))}
                  rows={4}
                />
              </label>

              {/* Logo URL - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Logo URL</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="url"
                      value={form.logoURL}
                      onChange={(e) => {
                        const v = sanitize(e.target.value);
                        if (v && !isURL(v)) setMessage("Logo URL seems invalid.");
                        else setMessage("");
                        setField("logoURL", v);
                      }} 
                  />
              </label>
              
              {/* Brochure Link - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Brochure Link</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="url"
                      value={form.brochureLink}
                      onChange={(e) => setField("brochureLink", sanitize(e.target.value))} 
                  />
              </label>
            </>
          )}

          {/* STEP 2 - LOCATION */}
          {step === 2 && (
            <>
              <h2 className="text-lg font-medium mb-2">Location</h2>
              {/* Address - Native Textarea (working field) */}
              <label className="block mb-3">
                <div className="text-sm text-gray-700 mb-1">Address</div>
                <textarea
                  className="w-full border rounded p-2 text-sm"
                  value={form.address}
                  onChange={(e) => setField("address", sanitize(e.target.value))}
                  rows={3}
                />
              </label>
              
              {/* City - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">City</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.city}
                      onChange={(e) => setField("city", sanitize(e.target.value))} 
                  />
              </label>

              {/* State - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">State</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.state}
                      onChange={(e) => setField("state", sanitize(e.target.value))} 
                  />
              </label>
              
              {/* Pincode - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Pincode</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.pincode}
                      onChange={(e) => setField("pincode", sanitize(e.target.value))} 
                  />
              </label>
              
              {/* Country - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Country</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.country}
                      onChange={(e) => setField("country", sanitize(e.target.value))} 
                  />
              </label>
            </>
          )}

          {/* STEP 3 - CONTACT */}
          {step === 3 && (
            <>
              <h2 className="text-lg font-medium mb-2">Contact</h2>
              
              {/* Official Email - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Official Email</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="email"
                      value={form.officialEmail}
                      onChange={(e) => {
                        const v = sanitize(e.target.value);
                        if (v && !isEmail(v)) setMessage("Email looks invalid.");
                        else setMessage("");
                        setField("officialEmail", v);
                      }} 
                  />
              </label>

              {/* Phone - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Phone</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.phoneNumber}
                      onChange={(e) => setField("phoneNumber", sanitize(e.target.value))} 
                  />
              </label>

              {/* Website URL - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Website URL</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="url"
                      value={form.websiteURL}
                      onChange={(e) => {
                        const v = sanitize(e.target.value);
                        if (v && !isURL(v)) setMessage("Website URL looks invalid.");
                        else setMessage("");
                        setField("websiteURL", v);
                      }} 
                  />
              </label>

              <div className="mb-3">
                <div className="text-sm text-gray-700 mb-1">Social Links</div>
                {form.socialLinks.map((s, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    <input
                      className="flex-1 border rounded p-2 text-sm"
                      placeholder="https://..."
                      value={s}
                      onChange={(e) => {
                        const arr = [...form.socialLinks];
                        // Raw input field, needs manual sanitize
                        arr[i] = sanitize(e.target.value); 
                        setField("socialLinks", arr);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const arr = [...form.socialLinks];
                        arr.splice(i, 1);
                        setField("socialLinks", arr);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setField("socialLinks", [...form.socialLinks, ""])}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  + Add Link
                </button>
              </div>
            </>
          )}

          {/* STEP 4 - COURSES (repeatable) */}
          {step === 4 && (
            <>
              <h2 className="text-lg font-medium mb-2">Courses (add multiple)</h2>
              {form.courses.map((c, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Course #{i + 1}</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateArrayItem("courses", i, (old: Course) => ({
                            ...old,
                            courseName: old.courseName, // noop
                          }))
                        }
                        className="text-sm text-gray-600"
                      >
                        {/* placeholder */}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeArrayItem("courses", i)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Course ID - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Course ID</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.courseID}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, courseID: sanitize(e.target.value) }))} 
                      />
                  </label>
                  
                  {/* Course Name - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Course Name *</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.courseName}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, courseName: sanitize(e.target.value) }))}
                      />
                  </label>

                  {/* Stream - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Stream</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.stream}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, stream: sanitize(e.target.value) }))}
                      />
                  </label>

                  <label className="block mb-3">
                    <div className="text-sm text-gray-700 mb-1">Degree Type</div>
                    <select
                      className="w-full border rounded p-2 text-sm"
                      value={c.degreeType}
                      onChange={(e) =>
                        updateArrayItem("courses", i, (old: Course) => ({ ...old, degreeType: e.target.value as DegreeType }))
                      }
                    >
                      <option value="">Select</option>
                      <option>B.Tech</option>
                      <option>M.Tech</option>
                      <option>BSc</option>
                      <option>MSc</option>
                      <option>MBA</option>
                      <option>Other</option>
                    </select>
                  </label>

                  {/* Duration (years) - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Duration (years)</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(c.durationYears)}
                          onChange={(e) =>
                            updateArrayItem("courses", i, (old: Course) => ({ ...old, durationYears: toNumberOrEmpty(sanitize(e.target.value)) }))
                          }
                      />
                  </label>

                  {/* Fees (annual) - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Fees (annual)</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(c.feesAnnual)}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, feesAnnual: toNumberOrEmpty(sanitize(e.target.value)) }))}
                      />
                  </label>

                  {/* Seats Available - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Seats Available</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(c.seatsAvailable)}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, seatsAvailable: toNumberOrEmpty(sanitize(e.target.value)) }))}
                      />
                  </label>

                  {/* Eligibility Criteria - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Eligibility Criteria</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.eligibilityCriteria}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, eligibilityCriteria: sanitize(e.target.value) }))}
                      />
                  </label>
                  
                  {/* Entrance Exams - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Entrance Exams (comma separated)</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.entranceExams}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, entranceExams: sanitize(e.target.value) }))}
                      />
                  </label>
                  
                  {/* Syllabus Link - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Syllabus Link</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="url"
                          value={c.syllabusLink}
                          onChange={(e) => updateArrayItem("courses", i, (old: Course) => ({ ...old, syllabusLink: sanitize(e.target.value) }))}
                      />
                  </label>

                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("courses", defaultCourse())}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                + Add Course
              </button>
            </>
          )}

          {/* STEP 5 - RANKINGS */}
          {step === 5 && (
            <>
              <h2 className="text-lg font-medium mb-2">Rankings</h2>
              {form.rankings.map((r, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                  
                  {/* Agency - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Agency</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={r.agency}
                          onChange={(e) => updateArrayItem("rankings", i, (old) => ({ ...old, agency: sanitize(e.target.value) }))}
                      />
                  </label>

                  {/* Year - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Year</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(r.year)}
                          onChange={(e) => updateArrayItem("rankings", i, (old) => ({ ...old, year: toNumberOrEmpty(sanitize(e.target.value)) }))}
                      />
                  </label>

                  {/* Rank - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Rank</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(r.rank)}
                          onChange={(e) => updateArrayItem("rankings", i, (old) => ({ ...old, rank: toNumberOrEmpty(sanitize(e.target.value)) }))}
                      />
                  </label>

                  {/* Category - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Category</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={r.category}
                          onChange={(e) => updateArrayItem("rankings", i, (old) => ({ ...old, category: sanitize(e.target.value) }))}
                      />
                  </label>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => removeArrayItem("rankings", i)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("rankings", defaultRanking())} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Ranking</button>
            </>
          )}

          {/* STEP 6 - CUTOFFS */}
          {step === 6 && (
            <>
              <h2 className="text-lg font-medium mb-2">Cutoffs</h2>
              {form.cutoffs.map((c, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                  
                  {/* Exam Name - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Exam Name</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.examName}
                          onChange={(e)=> updateArrayItem("cutoffs", i, (old)=>({...old, examName: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Year - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Year</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(c.year)}
                          onChange={(e)=> updateArrayItem("cutoffs", i, (old)=>({...old, year: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  {/* Round - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Round</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(c.round)}
                          onChange={(e)=> updateArrayItem("cutoffs", i, (old)=>({...old, round: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  {/* Course Name - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Course Name</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.courseName}
                          onChange={(e)=> updateArrayItem("cutoffs", i, (old)=>({...old, courseName: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Cutoff Rank/Percentile - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Cutoff Rank/Percentile</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.cutoffRankOrPercentile}
                          onChange={(e)=> updateArrayItem("cutoffs", i, (old)=>({...old, cutoffRankOrPercentile: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Category - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Category</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={c.category}
                          onChange={(e)=> updateArrayItem("cutoffs", i, (old)=>({...old, category: sanitize(e.target.value)}))} 
                      />
                  </label>

                  <div className="flex gap-2">
                    <button type="button" onClick={()=> removeArrayItem("cutoffs", i)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={()=> addArrayItem("cutoffs", defaultCutoff())} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Cutoff</button>
            </>
          )}

          {/* STEP 7 - ADMISSION */}
          {step === 7 && (
            <>
              <h2 className="text-lg font-medium mb-2">Admission</h2>
              
              {/* Admission Year - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Admission Year</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="number"
                      value={String(form.admission.admissionYear)}
                      onChange={(e)=> setField("admission", {...form.admission, admissionYear: toNumberOrEmpty(sanitize(e.target.value))})} 
                  />
              </label>

              {/* Application Start Date - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Application Start Date</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="date"
                      value={form.admission.applicationStartDate}
                      onChange={(e)=> setField("admission", {...form.admission, applicationStartDate: sanitize(e.target.value)})} 
                  />
              </label>
              
              {/* Application End Date - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Application End Date</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="date"
                      value={form.admission.applicationEndDate}
                      onChange={(e)=> setField("admission", {...form.admission, applicationEndDate: sanitize(e.target.value)})} 
                  />
              </label>
              
              {/* Process Description - Native Textarea (working field) */}
              <label className="block mb-3">
                <div className="text-sm text-gray-700 mb-1">Process Description</div>
                <textarea className="w-full border rounded p-2 text-sm" rows={4} value={form.admission.processDescription} onChange={(e)=> setField("admission", {...form.admission, processDescription: sanitize(e.target.value)})} />
              </label>
              
              {/* Required Documents - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Required Documents (comma separated)</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.admission.requiredDocuments}
                      onChange={(e)=> setField("admission", {...form.admission, requiredDocuments: sanitize(e.target.value)})} 
                  />
              </label>

              {/* Application Link - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Application Link</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="url"
                      value={form.admission.applicationLink}
                      onChange={(e)=> setField("admission", {...form.admission, applicationLink: sanitize(e.target.value)})} 
                  />
              </label>

              {/* Important Dates - Native Input */}
              <label className="block mb-3">
                  <div className="text-sm text-gray-700 mb-1">Important Dates</div>
                  <input
                      className="w-full border rounded p-2 text-sm"
                      type="text"
                      value={form.admission.importantDates}
                      onChange={(e)=> setField("admission", {...form.admission, importantDates: sanitize(e.target.value)})} 
                  />
              </label>

              <label className="block mb-3">
                <div className="text-sm text-gray-700 mb-1">Admission Status</div>
                <select className="w-full border rounded p-2 text-sm" value={form.admission.admissionStatus} onChange={(e)=> setField("admission", {...form.admission, admissionStatus: e.target.value as Admission["admissionStatus"]})}>
                  <option value="">Select</option>
                  <option>Open</option>
                  <option>Closed</option>
                  <option>Upcoming</option>
                </select>
              </label>
            </>
          )}

          {/* STEP 8 - PLACEMENT */}
          {step === 8 && (
            <>
              <h2 className="text-lg font-medium mb-2">Placements</h2>
              {form.placements.map((p, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                  
                  {/* Placement Year - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Placement Year</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(p.placementYear)}
                          onChange={(e)=> updateArrayItem("placements", i, old=>({...old, placementYear: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  {/* Placement Rate (%) - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Placement Rate (%)</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(p.placementRatePercent)}
                          onChange={(e)=> updateArrayItem("placements", i, old=>({...old, placementRatePercent: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  {/* Average Package - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Average Package</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(p.averagePackage)}
                          onChange={(e)=> updateArrayItem("placements", i, old=>({...old, averagePackage: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  {/* Highest Package - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Highest Package</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(p.highestPackage)}
                          onChange={(e)=> updateArrayItem("placements", i, old=>({...old, highestPackage: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  <label className="block mb-3">
                    <div className="text-sm text-gray-700 mb-1">Top Recruiters (comma separated)</div>
                    {/* Raw input field, needs manual sanitize */}
                    <input className="w-full border rounded p-2 text-sm" value={p.topRecruiters.join(", ")} onChange={(e)=> updateArrayItem("placements", i, old=>({...old, topRecruiters: sanitize(e.target.value).split(",").map(t=>t.trim()).filter(Boolean)}))} />
                  </label>
                  
                  {/* Highlights - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Highlights</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={p.highlights}
                          onChange={(e)=> updateArrayItem("placements", i, old=>({...old, highlights: sanitize(e.target.value)}))} 
                      />
                  </label>

                  <div className="flex gap-2">
                    <button type="button" onClick={()=> removeArrayItem("placements", i)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={()=> addArrayItem("placements", defaultPlacement())} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Placement Record</button>
            </>
          )}

          {/* STEP 9 - FACULTY & SCHOLARSHIPS */}
          {step === 9 && (
            <>
              <h2 className="text-lg font-medium mb-2">Faculty</h2>
              {form.faculty.map((f, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                  
                  {/* Faculty ID - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Faculty ID</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={f.facultyID}
                          onChange={(e)=> updateArrayItem("faculty", i, old=>({...old, facultyID: sanitize(e.target.value)}))} 
                      />
                  </label>
                  
                  {/* Name - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Name</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={f.name}
                          onChange={(e)=> updateArrayItem("faculty", i, old=>({...old, name: sanitize(e.target.value)}))} 
                      />
                  </label>
                  
                  {/* Designation - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Designation</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={f.designation}
                          onChange={(e)=> updateArrayItem("faculty", i, old=>({...old, designation: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Department - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Department</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={f.department}
                          onChange={(e)=> updateArrayItem("faculty", i, old=>({...old, department: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Qualification - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Qualification</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={f.qualification}
                          onChange={(e)=> updateArrayItem("faculty", i, old=>({...old, qualification: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Experience Years - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Experience Years</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="number"
                          value={String(f.experienceYears)}
                          onChange={(e)=> updateArrayItem("faculty", i, old=>({...old, experienceYears: toNumberOrEmpty(sanitize(e.target.value))}))} 
                      />
                  </label>

                  <div className="flex gap-2">
                    <button type="button" onClick={()=> removeArrayItem("faculty", i)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={()=> addArrayItem("faculty", defaultFaculty())} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Faculty</button>

              <h2 className="text-lg font-medium mt-6 mb-2">Scholarships</h2>
              {form.scholarships.map((s, i) => (
                <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                  
                  {/* Name - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Name</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={s.scholarshipName}
                          onChange={(e)=> updateArrayItem("scholarships", i, old=>({...old, scholarshipName: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Eligibility - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Eligibility</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={s.eligibility}
                          onChange={(e)=> updateArrayItem("scholarships", i, old=>({...old, eligibility: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Amount/Benefit - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Amount/Benefit</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={s.amountOrBenefit}
                          onChange={(e)=> updateArrayItem("scholarships", i, old=>({...old, amountOrBenefit: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Procedure - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Procedure</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="text"
                          value={s.applicationProcedure}
                          onChange={(e)=> updateArrayItem("scholarships", i, old=>({...old, applicationProcedure: sanitize(e.target.value)}))} 
                      />
                  </label>

                  {/* Deadline - Native Input */}
                  <label className="block mb-3">
                      <div className="text-sm text-gray-700 mb-1">Deadline</div>
                      <input
                          className="w-full border rounded p-2 text-sm"
                          type="date"
                          value={s.deadline}
                          onChange={(e)=> updateArrayItem("scholarships", i, old=>({...old, deadline: sanitize(e.target.value)}))} 
                      />
                  </label>

                  <div className="flex gap-2">
                    <button type="button" onClick={()=> removeArrayItem("scholarships", i)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={()=> addArrayItem("scholarships", defaultScholarship())} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Scholarship</button>
            </>
          )}

          {/* STEP 10 - GALLERY & FACILITIES + SAVE */}
          {step === 10 && (
            <>
              <h2 className="text-lg font-medium mb-2">Gallery & Facilities</h2>

              <div className="mb-3">
                <div className="text-sm text-gray-700 mb-1">Gallery (image URLs)</div>
                {form.gallery.map((g, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    {/* Raw input field, needs manual sanitize */}
                    <input className="flex-1 border rounded p-2 text-sm" value={g} onChange={(e)=> { const arr = [...form.gallery]; arr[i] = sanitize(e.target.value); setField("gallery", arr); }} />
                    <button type="button" onClick={()=> { const arr = [...form.gallery]; arr.splice(i,1); setField("gallery", arr); }} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={()=> setField("gallery", [...form.gallery, ""])} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Image URL</button>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-700 mb-1">Facilities (comma separated)</div>
                {/* Raw input field, needs manual sanitize and split */}
                <input className="w-full border rounded p-2 text-sm" value={form.facilities.join(", ")} onChange={(e)=> setField("facilities", sanitize(e.target.value).split(",").map(s=>s.trim()).filter(Boolean))} />
              </div>

              <div className="mt-4">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save as CSV</button>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            {step > 1 ? (
              <button type="button" onClick={prev} className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600">Previous</button>
            ) : <div />}

            {step < 10 ? (
              <button type="button" onClick={next} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeAdd;