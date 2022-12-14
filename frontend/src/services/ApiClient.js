const url = 'http://localhost:5000';

const apiClient = {
  pageLoad: async id => {
    const userQuery = await fetch(`${url}/user/${id}`);
    const response = await userQuery.json();

    if (response.length === 0) {
      const pog = await fetch(`${url}/user`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          created_at: Date.now(),
        }),
      });
      // need to return something special to signal this was first time user
      return pog.json();
    }
    return response;
  },

  firstTimeCheck: async id => {
    const userQuery = await fetch(`${url}/user/cals/${id}`);
    const response = await userQuery.json();
    if (typeof response[0] == 'object') {
      return response[0];
    }

    return false;
  },

  postFirstCals: async (id, daily, goal, starting) => {
    const pog = await fetch(`${url}/user/cals`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        daily_cals: daily,
        weight_history: `[[1659832594000,0,260]]`,
        weight_goal: goal,
        starting_weight: starting,
      }),
    });
    return pog.json();
  },

  getCals: async id => {
    const userQuery = await fetch(`${url}/user/cals/${id}`);
    const response = await userQuery.json();
    return response;
  },

  updateCals: async (id, newCals) => {
    const pog = await fetch(`${url}/user/cals/add/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weight_history: `[${Date.now()}, 0, ${newCals}]`,
      }),
    });
    return pog.json();
  },

  updateMeals: async (id, meal, date) => {
    const pog = await fetch(`${url}/user/cals/meals/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        meal,
      }),
    });
    return pog.json();
  },

  getMeals: async id => {
    const pog = await fetch(`${url}/user/cals/meals/${id}`);
    let res = await pog.json();
    res = JSON.parse(res);
    return res;
  },

  deleteMeal: async (id, date, meal) => {
    const pog = await fetch(`${url}/user/cals/meals/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        meal,
      }),
    });
    return pog;
  },

  getRecipes: async q => {
    const pog = await fetch(
      `https://edamam-recipe-search.p.rapidapi.com/search?q=${q}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key':
            'bdf2b0b83dmshd8ca840f9acbb40p1661d1jsne3db3f540559',
        },
      }
    );
    const response = await pog.json();
    return response.hits;
  },
};

export default apiClient;
