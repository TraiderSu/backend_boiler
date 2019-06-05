import * as postsDAL from './postsDAL';
import { validate } from './Post';

export const getList = async (req, res, next) => {
  try {
    const result = await postsDAL.getRecordList();

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const validatedParams = await validate(req).catch(err => {
      console.log('ошибка в функции валидации');
      throw err;
    });

    console.log('validatedParams', validatedParams);

    const result = await postsDAL.getRecord(req.params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    validate(req);
    // const result = await postsDAL.createRecord(req.body);
    res.status(200).json({ result: '' });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const result = await postsDAL.updateRecord(req.params.id, req.body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const result = await postsDAL.deleteRecord(req.params.id);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
