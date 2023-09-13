const buildResponse = (res, code, message, data, pagination) => {
  res.status(code).json({
    meta: {
      code,
      message,
      pagination,
    },
    data,
  });
};

const buildPagination = (params, total) => {
  const pagination = {
    page: parseInt(params.page),
    size: parseInt(params.size),
    total_data: total,
    total_page: 0,
  };

  if (params.size > 0 && params.page > 0) {
    pagination.total_page = Math.ceil(total / params.size);
  }

  return pagination;
};

module.exports = { buildResponse, buildPagination };
