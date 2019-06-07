export function errorService(err, _, res, __) {
  const { status, name, message, stack } = err;

  console.log('ошибка в миделваре');
  console.error({ status, name, message, stack });

  res.status(status || 500).json({
    result: null,
    success: false,
    errors: message || 'Unexpected error happened'
  });
}
