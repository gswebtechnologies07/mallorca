'use strict';

/**
 * attractions service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::attractions.attractions');
