'use strict';

/**
 * category-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::category-management.category-management');
