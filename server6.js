//Sample promises

function fetchUserById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ userId: id, username: "JohnDoe" });
    }, 1000);
  });
}

function fetchPostsByUserId(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2", "Post 3"]);
    }, 1000);
  });
}

//Promise practice

function loadUserProfile(id) {
  return fetchUserById(id)
    .then((user) => {
      console.log("Loading posts by " + user.userId);
      return fetchPostsByUserId(user.userId);
    })
    .then((posts) => {
      console.log("POSTS: " + posts);
      return posts;
    })
    .catch((error) => {
      console.error(error);
    });
}

const loadUserProfileAsync = async (id) => {
  const user = await fetchUserById(id);
  const posts = await fetchPostsByUserId(user.userId);
  console.log("User " + user.userId + " posted: " + posts);
};

function safeDivide(n, d) {
  return new Promise((resolve, reject) => {
    if (d === 0) {
      reject("Denominator can't be 0");
    } else {
      resolve(n / d);
    }
  });
}

const safeDivideAsync = async (n, d) => {
  if (d === 0) return new Error("Denominator can't be 0");

  return n / d;
};

//? fetch from multiple urls

function fetchMultipleUrls(urls = []) {
  const pendingArray = urls.map((url) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Error!");
      }
      return res.json();
    })
  );

  Promise.all(pendingArray)
    .then((data) => console.log(data))
    .catch((error) => console.log("ERROR: ", error));
}

const fetchMultipleUrlsAsync = async (urls = []) => {
  try {
    const pendingArray = urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Can't fetch the url: ", url);
      }
      return response.json();
    });

    const results = await Promise.all(pendingArray);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};

//? retrieve value from a promise if possible before timer, else return error

function timeoutPromise(promise, timer) {
  const rejectPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject("Timeout");
    }, timer);
  });

  return Promise.race([promise, rejectPromise]);
}

const timeoutPromiseAsync = async (promise, timer) => {
  const rejectPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject("Timeout!!!");
    }, timer);
  });

  return Promise.race([promise, rejectPromise]);
};

//? Fetch from a primary url, else from a secondary url

function fetchDataWithBackup(primaryUrl, secondaryUrl) {
  return fetch(primaryUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch from the primary URL with: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return fetch(secondaryUrl).then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch from the secondary URL with: ${response.status}`
          );
        }
        return response.json();
      });
    });
}

function fetchDataWithBackup2(primaryUrl, secondaryUrl) {
  return fetch(primaryUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Primary Source Failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return fetch(secondaryUrl).then((response) => {
        if (!response.ok) {
          throw new Error("Secondary source failed");
        }
        return response.json();
      });
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Both Sources Failed");
    });
}

function fetchDataWithBackup3(primaryUrl, secondaryUrl) {
  const fetchData = (url) => {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`${url} Failure`);
      }
      return response.json();
    });
  };

  return fetchData(primaryUrl)
    .catch((error) => {
      console.log(`Primary Failed: `, error.message);
      return fetchData(secondaryUrl);
    })
    .catch((error) => {
      console.log(`Secondary Failed: `, error.message);
      throw new Error("Both sources failed");
    });
}

const fetchDataWithBackupAsync = async (primaryUrl, secondaryUrl) => {
  try {
    const primaryRes = await fetch(primaryUrl);
    if (!primaryRes.ok) {
      throw new Error("Primary failed");
    }
    const primaryData = await primaryRes.json();
    return primaryData;
  } catch (error) {
    console.log(error);
    try {
      const secondaryRes = await fetch(secondaryUrl);
      if (!secondaryRes.ok) {
        throw new Error("Secondary failed");
      }
      const secondaryData = await secondaryRes.json();
      return secondaryData;
    } catch (error) {
      console.log(error);
    }
  }
};

// fetchDataWithBackup2(
//   "https://jsonplaceholder.typicode.com/users",
//   "https://jsonplaceholder.typicode.com/posts"
// )
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

//? Write a function aggregateData that takes an array of URLs and returns a single object containing the combined data from all URLs. If any URL fails to fetch, the function should ignore the failed URL and include data from the others.

function aggregateData(urls = []) {
  const promiseArray = urls.map((url) => {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load from ${url}`);
        }
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  });

  return Promise.all(promiseArray)
    .then((data) => {
      const result = data.filter((arr) => arr !== null);
      console.log(result);
    })
    .catch((error) => console.log(error));
}

const aggregateDataAsync = async (urls = []) => {
  try {
    const promiseArray = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to retrieve from ${url}`);
        }
        return response.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const result = await Promise.all(promiseArray).then((newUrls) =>
      newUrls.filter((url) => url !== null)
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// aggregateDataAsync([
//   "https://jsonplaceholder.typicode.com/users",
//   "https://jsonplaceholder.typicode.com/posts",
// ]);

//? retry fetching from the same url 3 times, if failed every time then reject

function fetchWithRetryX(url) {
  const fetchData = (url) => {
    return fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("Failed!");
      }
      return res.json();
    });
  };

  return fetchData(url)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
      return fetchData(url);
    })
    .catch((error) => {
      console.log(error);
      return fetchData(url);
    })
    .catch((error) => {
      console.log(`Couldn't retrieve within 3 tries: `, error.message);
    });
}

function fetchWithRetry(url, retries, delay) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed response");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        if (retries > 0) {
          console.log(`Retries left ${retries - 1}: `, error.message);
          setTimeout(() => {
            fetchWithRetry(url, retries - 1, delay)
              .then(resolve)
              .catch(reject);
          }, delay);
        } else {
          reject(new Error(`Ran out of retries: `, error.message));
        }
      });
  });
}

const fetchWithRetryAsync = async (url, retries, delay) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("failed to fetch!");
    }
    return await res.json();
  } catch (error) {
    console.log(`Retries left: ${retries}`, error);
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetryAsync(url, retries - 1, delay);
    } else {
      throw new Error("Out of retries!");
    }
  }
};

// fetchWithRetryAsync("https://jsonplaceholder.typicode.com/usersx", 3, 1000)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

//? Calix interview

const getAccounts = () => {
  return Promise.resolve([
    {
      id: "acct1",
      name: "International Account 1",
      region: "International",
      lifetimeSpend: 600,
      opportunities: [
        {
          name: "Opportunity 1",
          revision: 5,
          quotes: [],
        },
      ],
    },
    {
      id: "acct2",
      name: "Domestic Account 1",
      region: "Domestic",
      lifetimeSpend: 0,
      opportunities: [
        {
          name: "Opportunity 2",
          revision: 2,
          quotes: [
            {
              name: "Old Quote",
              targetValue: 10,
            },
          ],
        },
      ],
    },
    {
      id: "acct3",
      name: "Domestic Account 2",
      region: "Domestic",
      lifetimeSpend: 20,
      opportunities: [],
    },
    {
      id: "acct4",
      name: "International Account 2",
      region: "International",
      lifetimeSpend: 20,
      opportunities: [
        {
          name: "Opportunity 1",
          revision: 0,
          quotes: [
            {
              name: "Old Int. Quote",
              targetValue: 100,
            },
          ],
        },
      ],
    },
  ]);
};

const solution = async (arr = []) => {
  try {
    const accounts = await getAccounts();

    const accountMapX = {};
    accounts.forEach((acc) => {
      accountMapX[acc.id] = acc;
    });

    //console.log(accountMapX);

    arr.forEach((id) => {
      const result = accounts.find((acc) => acc.id === id);

      if (!result) {
        console.log(`Account ${id} was not found`);
        return;
      }

      if (result.region === "Domestic") {
        const newOpportunity = {
          name: "New Opportunity",
          quotes: [
            {
              name: `${result.name}-1`,
              targetValue: result.lifetimeSpend > 0 ? 100 : 10,
            },
            {
              name: `${result.name}-2`,
              targetValue: result.lifetimeSpend > 0 ? 100 : 10,
            },
          ],
        };
        result.opportunities.push(newOpportunity);
      } else {
        result.opportunities.forEach((opportunity) => {
          opportunity.revision += 1;
        });
      }
    });
    return Promise.resolve(accounts);
  } catch (error) {
    return Promise.reject(error);
  }
};

const solution2 = async (arr = []) => {
  try {
    const accounts = await getAccounts();
    const accountsMap = {};
    accounts.forEach((account) => {
      accountsMap[account.id] = account;
    });

    arr.forEach((id) => {
      //const account = accounts.find((acc) => acc.id === id);
      const account = accountsMap[id];
      if (!account) {
        console.log(`Account ${id} not found`);
        return;
      }
      //console.log(account);

      if (account.region === "Domestic") {
        const newOpportunity = {
          name: "New Opportunity",
          quotes: [
            {
              name: `${account.name}-1`,
              targetValue: account.lifetimeSpend > 0 ? 100 : 10,
            },
            {
              name: `${account.name}-2`,
              targetValue: account.lifetimeSpend > 0 ? 100 : 10,
            },
          ],
        };
        account.opportunities.push(newOpportunity);
      } else {
        account.opportunities.forEach((opportunity) => {
          opportunity.revision += 1;
        });
      }
    });

    return Promise.resolve(accounts);
  } catch (error) {
    return Promise.reject("Error: ", error);
  }

  //console.log(accounts);
};

const solution3 = async (arr = []) => {
  const accounts = await getAccounts();

  arr.forEach((id) => {
    const account = accounts.find((acc) => acc.id === id);

    if (!account) {
      console.log(`Account ${id} not found`);
      return;
    }
  });
};

// solution3(["acct1", "acct3", "acct7"])
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

const getOrders = () => {
  return Promise.resolve([
    {
      id: "order1",
      customerId: "cust1",
      totalAmount: 600,
      items: [
        {
          productId: "prod1",
          quantity: 1,
          price: 200,
          category: "electronics",
        },
        { productId: "prod2", quantity: 3, price: 100, category: "books" },
        { productId: "prod3", quantity: 2, price: 50, category: "furniture" },
      ],
      placedAt: "2023-05-01T10:00:00Z",
    },
    {
      id: "order2",
      customerId: "cust2",
      totalAmount: 1200,
      items: [
        { productId: "prod4", quantity: 1, price: 100, category: "clothing" },
        { productId: "prod5", quantity: 4, price: 300, category: "toys" },
        {
          productId: "prod6",
          quantity: 4,
          price: 200,
          category: "electronics",
        },
        {
          productId: "prod7",
          quantity: 4,
          price: 200,
          category: "electronics",
        },
        { productId: "prod8", quantity: 4, price: 50, category: "toys" },
        { productId: "prod9", quantity: 4, price: 50, category: "books" },
      ],
      placedAt: "2023-04-15T10:00:00Z",
    },
    {
      id: "order3",
      customerId: "cust1",
      totalAmount: 300,
      items: [
        { productId: "prod6", quantity: 5, price: 20, category: "furniture" },
        { productId: "prod7", quantity: 1, price: 100, category: "clothing" },
        { productId: "prod8", quantity: 3, price: 50, category: "toys" },
        { productId: "prod9", quantity: 2, price: 150, category: "books" },
      ],
      placedAt: "2023-06-10T10:00:00Z",
    },
    // More orders
  ]);
};

const discountCategories = ["electronics", "books"];
const discountPercentage = 10;

const updateOrderStatuses = async (
  discountCategories = [],
  discountPercentage = 0
) => {
  // Your code here
  const orders = await getOrders();

  orders.forEach((order) => {
    let totalDiscount = 0;
    order.totalAmount = 0;
    const uniqueCategories = new Set();

    order.items.forEach((item) => {
      if (discountCategories.includes(item.category)) {
        const discount = (discountPercentage / 100) * item.price;
        totalDiscount += discount * item.quantity;
        item.price = item.price - discount;
      }
      order.totalAmount += item.quantity * item.price;
      uniqueCategories.add(item.category);
    });

    console.log(totalDiscount);

    if (order.totalAmount > 1000) {
      order.bigSpender = true;
    }

    if (uniqueCategories.size >= 4) {
      order.diverseShopper = true;
    }
  });

  console.log(orders);
};

//updateOrderStatuses(discountCategories, discountPercentage);

// TRASH

const fetchWithRetry2 = async (url, retries = 3, delay = 1000) => {
  try {
    const userData = await fetch(url);
    if (!userData.ok) {
      throw new Error("User fetch failed");
    }
    return userData.json();
  } catch (error) {
    console.log(`Retries left: ${retries}: `, error);
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry2(url, retries - 1, delay);
    } else {
      throw new Error(`Out of retries`);
    }
  }
};

const apiBaseUrl = "https://jsonplaceholder.typicode.com";

const fetchUsersAndPosts = async () => {
  try {
    const users = await fetchWithRetry2(`${apiBaseUrl}/users`);

    const postsAndUserPromises = users.map(async (user) => {
      try {
        const posts = await fetch(`${apiBaseUrl}/posts?userId=${user.id}/324`);

        return { user, posts: await posts.json() };
      } catch (error) {
        console.log(`Couldn't load posts of user ${user.id}`);
        return { user, posts: [] };
      }
    });

    const postAndUserArray = await Promise.all(postsAndUserPromises);

    console.log(postAndUserArray);
  } catch (error) {
    console.log(`Failed`, error);
  }
};

//
