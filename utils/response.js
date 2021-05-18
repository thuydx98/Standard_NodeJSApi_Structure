const success = (res, data) => {
  return res.status(200).send({
    success: true,
    data: data,
    error: null,
  });
};

const error = (res, error, status = 500) => {
  return res.status(status).send({
    success: false,
    data: null,
    error: error,
  });
};

export default { success, error };
