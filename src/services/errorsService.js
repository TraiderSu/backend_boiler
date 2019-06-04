export default function errorService() {
  return (err, _, res, __) => {
    const { status, name, message, stack } = err;
    console.error({ status, name, message, stack });
    res.status(status || 500).json({
      status: status || 500,
      name,
      message: message || 'Unexpected error happened'
    });
  };
}
