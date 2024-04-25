
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(error => error.message); 
      return res.status(400).json({ errors });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  };
  
  module.exports = errorHandler;
  