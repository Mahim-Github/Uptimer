import serverPort from "./backendUrl";

export async function signIn({ email, password }) {
  try {
    let body = { email, password };
    const res = await fetch(`${serverPort}/api/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.user.authenticated) {
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem("authToken", data.token);
    }
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function signUp({ email, password, username }) {
  try {
    let body = { email, password, username };
    const res = await fetch(`${serverPort}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.token) {
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem("authToken", data.token);
    }
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getUser() {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${serverPort}/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the header
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function setupMonitor(monitor) {
  try {
    console.log(monitor);
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${serverPort}/api/monitors/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monitor),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function getMonitor() {
  //user = {email}
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${serverPort}/api/monitors`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the header
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getMonitorLogs() {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${serverPort}/api/monitors/logs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the header
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getDowntimeLogs() {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${serverPort}/api/monitors/downtimes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the header
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
}
