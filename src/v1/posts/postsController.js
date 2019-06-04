export const getList = (req, res, next) => {
  try {
    res.status(200).json({ ok: 'getList' });
  } catch (err) {
    next(err);
  }
};

export const getItem = (req, res, next) => {
  try {
    res.status(200).json({ ok: 'getItem' });
  } catch (err) {
    next(err);
  }
};

export const createItem = (req, res, next) => {
  try {
    res.status(200).json({ ok: 'createItem' });
  } catch (err) {
    next(err);
  }
};

export const updateItem = (req, res, next) => {
  try {
    res.status(200).json({ ok: 'updateItem' });
  } catch (err) {
    next(err);
  }
};

export const patchItem = (req, res, next) => {
  try {
    res.status(200).json({ ok: 'patchItem' });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = (req, res, next) => {
  try {
    res.status(200).json({ ok: 'deleteItem' });
  } catch (err) {
    next(err);
  }
};
