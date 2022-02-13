const API_URL = "http://localhost:8000";

export const getToken = () => {
    return localStorage.getItem('token');
};

export const testToken = async () => {
    let response = await fetch(`${API_URL}/api/feels`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    })
    let data = await response.json();

    return data.code !== 401;
}


export const LoginAPI = async ({email, password}) => {
    let response = await fetch(`${API_URL}/authentication_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    });
    let data = await response.json();

    return data;
};

export const RegisterAPI = async ({email, password}) => {
    let response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    });
    let data = await response.json();

    return data;
}

export const createFeelAPI = async ({description, note, mood, isCustom = false, newDate}) => {
    let response = await fetch(`${API_URL}/api/feels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            "description":description,
            "note":note,
            "mood":mood,
            "isCustom":isCustom,
            "newDate":newDate
        })
    });
    let data = await response.json();

    return data;
}

export const deleteFeelAPI = async (id) => {
    let response = await fetch(`${API_URL}/api/feels/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
    let data = await response.json();

    return data;
}

export const updateFeelAPI = async (id, {description, note, mood, isCustom = false, newDate}) => {
    let response = await fetch(`${API_URL}/api/feels/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            "description":description,
            "note":note,
            "mood":mood,
            "isCustom":isCustom,
            "newDate":newDate
        })
    });
    let data = await response.json();

    return data;
}



export const getFeelsAPI = async () => {
    let response = await fetch(`${API_URL}/api/feels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
    let data = await response.json();

    return data;
}

export const getFeelAPI = async (id) => {
    let response = await fetch(`${API_URL}/api/feels/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
    let data = await response.json();

    return data;
}
export const getMoodsAPI = async () => {
    let response = await fetch(`${API_URL}/api/moods`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
    let data = await response.json();

    return data;
}


export const getRecapAPI = async (param) => {
    let response = await fetch(`${API_URL}/api/feels/recap/${param}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
    let data = await response.json();

    return data;
}