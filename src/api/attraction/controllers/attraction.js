

/**
 * attraction controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::attraction.attraction');



// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::attraction.attraction', ({ strapi }) => ({
//     async findOne(ctx){
//         const { id } = ctx.params;

//         const entity = await strapi.db.query('api::attraction.attraction').findOne({
//             where: { slug:id }
//         });
//         const sanitizedEntity = await this.sanitizedEntity(entity, ctx);

//         return this.transformResponse(sanitizedEntity);
//     }
// }));

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::attraction.attraction', ({ strapi }) => ({
  async search(ctx) {
    const { location, radius, numberOfGuests } = ctx.request.body;

    try {
      const geoResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyBeSYHJyh5OmxQ_x4O7t_nQjDA7M9h5HmI`
      );

      if (geoResponse.data && geoResponse.data.results.length > 0) {
        const { lat, lng } = geoResponse.data.results[0].geometry.location;
        const radiusInMeters = radius * 1000;
        const knex = strapi.db.connection;

        const attractions = await knex('attractions')
          .select('*')
          .whereRaw(
            `ST_Distance_Sphere(point(JSON_EXTRACT(Real_Address, '$.coordinates.lng'), JSON_EXTRACT(Real_Address, '$.coordinates.lat')), point(?, ?)) <= ?`,
            [lng, lat, radiusInMeters]
          )
          .andWhere('Number_of_Guest', numberOfGuests);

        ctx.body = attractions;
      } else {
        ctx.body = { error: 'Invalid location' };
      }
    } catch (error) {
      console.error('Error:', error);
      ctx.body = { error: 'Server error' };
    }
  }
}));

