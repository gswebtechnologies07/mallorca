'use strict';

/**
 * attraction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::attraction.attraction');



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