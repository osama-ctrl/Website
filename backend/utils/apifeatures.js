class ApiFeature {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    filter() {
      const queryCopy = { ...this.queryStr };
  
      const removeFields = ["keyword", "page", "limit"];
  
      removeFields.forEach((key) => {
        delete queryCopy[key];
      });
  
      // Extract price range from query parameters
      const { price_gte, price_lte } = queryCopy;
  
      // Remove price-related fields from the queryCopy
      delete queryCopy.price_gte;
      delete queryCopy.price_lte;
  
      // Build the MongoDB query for the price range
      if (price_gte || price_lte) {
        queryCopy.price = {};
        if (price_gte) queryCopy.price.$gte = parseFloat(price_gte);
        if (price_lte) queryCopy.price.$lte = parseFloat(price_lte);
      }

      
  console.log("Filtered Query:", queryCopy);

  
      this.query = this.query.find(queryCopy);
  
      return this;
    }
  
    regularPagination(itemsPerPage) {
      const page = Number(this.queryStr.page) || 1;
      const skip = itemsPerPage * (page - 1);
      const limit = itemsPerPage;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  
    filterSearchPagination(itemsPerPage) {
      const page = Number(this.queryStr.page) || 1;
      const skip = itemsPerPage * (page - 1);
      const limit = itemsPerPage;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = ApiFeature;
  