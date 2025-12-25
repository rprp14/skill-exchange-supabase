/* ================================
   SUPABASE CONFIG
================================ */

/*const supabaseUrl = "https://ktaohvnpagkqzombfuqd.supabase.co";
const supabaseKey = "sb_publishable_SMDllJSkK2Nn-HV7GPvCNw_ef20ZjTG";
alert("SCRIPT JS LOADED");

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

console.log("Supabase initialized");
console.log("script.js loaded");

document.getElementById("signupBtn").addEventListener("click", function () {
  alert("SIGNUP CLICKED");
});

document.getElementById("loginBtn").addEventListener("click", function () {
  alert("LOGIN CLICKED");
});

/* ================================
   AUTH GUARD
================================ */

/*async function protectPage() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "index.html";
  }
}

if (
  window.location.pathname.includes("profile") ||
  window.location.pathname.includes("skills") ||
  window.location.pathname.includes("matches")
) {
  protectPage();
}

/* ================================
   AUTHENTICATION
================================ */

/*async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Signup successful! You can now login.");
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "profile.html";
  }
}

/* ================================
   PROFILE
================================ */

/*async function saveProfile() {
  const name = document.getElementById("name").value;
  const college = document.getElementById("college").value;
  const branch = document.getElementById("branch").value;

  if (!name || !college || !branch) {
    alert("Fill all profile fields");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      name,
      college,
      branch,
    });

  if (error) {
    alert(error.message);
  } else {
    alert("Profile saved successfully!");
    window.location.href = "skills.html";
  }
}

/* ================================
   SKILLS
================================ */

/*async function addSkill() {
  const skill = document.getElementById("skill").value;
  const type = document.getElementById("type").value;

  if (!skill) {
    alert("Enter skill name");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("skills")
    .insert({
      user_id: user.id,
      skill_name: skill,
      type: type,
    });

  if (error) {
    alert(error.message);
  } else {
    document.getElementById("skill").value = "";
    loadSkills();
  }
}

async function loadSkills() {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  document.getElementById("skillList").innerHTML =
    data.map(s => `
      <p>
        <b>${s.skill_name}</b>
        <small>(${s.type})</small>
      </p>
    `).join("");
}

if (document.getElementById("skillList")) {
  loadSkills();
}

/* ================================
   LOGOUT (OPTIONAL)
================================ */

/*async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
*/

document.addEventListener("DOMContentLoaded", function () {

  console.log("DOM fully loaded");

  /* ===============================
     SUPABASE CONFIG
  ================================ */
  const supabaseUrl = "https://ktaohvnpagkqzombfuqd.supabase.co";
  const supabaseKey = "sb_publishable_SMDllJSkK2Nn-HV7GPvCNw_ef20ZjTG";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

  /* ===============================
     LOGIN / SIGNUP
  ================================ */
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (signupBtn && loginBtn) {

    signupBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Signup successful!");
    });

    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else window.location.href = "profile.html";
    });
  }

  /* ===============================
     PROFILE PAGE
  ================================ */
  const saveProfileBtn = document.getElementById("saveProfileBtn");

  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", async () => {

      const name = document.getElementById("name").value;
      const college = document.getElementById("college").value;
      const branch = document.getElementById("branch").value;

      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          name,
          college,
          branch
        });

      if (error) alert(error.message);
      else window.location.href = "skills.html";
    });
  }

  /* ===============================
     SKILLS PAGE
  ================================ */
  const addSkillBtn = document.getElementById("addSkillBtn");
  const skillList = document.getElementById("skillList");

  if (addSkillBtn && skillList) {
    loadSkills();

    addSkillBtn.addEventListener("click", async () => {

      const skill = document
        .getElementById("skill")
        .value
        .trim()
        .toLowerCase();

      const type = document.getElementById("type").value;

      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("skills")
        .insert({
          user_id: user.id,
          skill_name: skill,
          type
        });

      if (error) alert(error.message);
      else {
        document.getElementById("skill").value = "";
        loadSkills();
      }
    });
  }

  async function loadSkills() {
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", user.id);

    skillList.innerHTML = data.map(s =>
      `<p><b>${s.skill_name}</b> (${s.type})</p>`
    ).join("");
  }

  /* ===============================
     STEP-5: MATCHES PAGE
  ================================ */
  const matchesList = document.getElementById("matchesList");

  if (matchesList) {
    loadMatches();
  }

  async function loadMatches() {

    const { data: { user } } = await supabase.auth.getUser();

    const { data: myRequests } = await supabase
      .from("skills")
      .select("skill_name")
      .eq("user_id", user.id)
      .eq("type", "request");

    if (!myRequests || myRequests.length === 0) {
      matchesList.innerHTML = "<p>No requested skills.</p>";
      return;
    }

    const requestedSkills = myRequests.map(s => s.skill_name);

    const { data: matches } = await supabase
      .from("skills")
      .select(`
        skill_name,
        user_id,
        profiles (
          name,
          college,
          branch
        )
      `)
      .eq("type", "offer")
      .in("skill_name", requestedSkills)
      .neq("user_id", user.id);

    if (!matches || matches.length === 0) {
      matchesList.innerHTML = "<p>No matches found.</p>";
      return;
    }

    matchesList.innerHTML = matches.map(m => `
      <div style="border:1px solid #ccc; padding:12px; margin:10px">
        <b>Name:</b> ${m.profiles.name}<br>
        <b>College:</b> ${m.profiles.college}<br>
        <b>Branch:</b> ${m.profiles.branch}<br>
        <b>Skill:</b> ${m.skill_name}<br><br>

        <button onclick="sendConnectRequest('${m.user_id}')">
          Connect
        </button>
      </div>
    `).join("");
  }

  /* ===============================
     STEP-6: CONNECT REQUEST
  ================================ */
  window.sendConnectRequest = async function (receiverId) {

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("connections")
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        status: "pending"
      });

    if (error) {
      if (error.code === "23505") {
        alert("Request already sent");
      } else {
        alert(error.message);
      }
    } else {
      alert("Connection request sent!");
    }
  };
/* ===============================
   STEP-7: VIEW & HANDLE REQUESTS
=============================== */

const requestList = document.getElementById("requestList");

if (requestList) {
  loadRequests();
}

async function loadRequests() {

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const { data: requests, error } = await supabase
    .from("connections")
    .select(`
      id,
      sender_id,
      status,
      profiles:sender_id (
        name,
        college,
        branch
      )
    `)
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error || !requests || requests.length === 0) {
    requestList.innerHTML = "<p>No pending requests.</p>";
    return;
  }

  requestList.innerHTML = requests.map(r => `
    <div style="border:1px solid #ccc; padding:12px; margin:10px 0">
      <b>Name:</b> ${r.profiles.name}<br>
      <b>College:</b> ${r.profiles.college}<br>
      <b>Branch:</b> ${r.profiles.branch}<br><br>

      <button onclick="acceptRequest(${r.id})">✅ Accept</button>
      <button onclick="rejectRequest(${r.id})">❌ Reject</button>
    </div>
  `).join("");
}

/* ===== ACCEPT ===== */
window.acceptRequest = async function (requestId) {
  const { error } = await supabase
    .from("connections")
    .update({ status: "accepted" })
    .eq("id", requestId);

  if (error) alert(error.message);
  else {
    alert("Request accepted");
    loadRequests();
  }
};

/* ===== REJECT ===== */
window.rejectRequest = async function (requestId) {
  const { error } = await supabase
    .from("connections")
    .update({ status: "rejected" })
    .eq("id", requestId);

  if (error) alert(error.message);
  else {
    alert("Request rejected");
    loadRequests();
  }
};

});
