module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/attractions/search',
        handler: 'attraction.search',
        config: {
          auth:false,
          policies: [],
          middlewares: [],
        },
      },
    ],
  };