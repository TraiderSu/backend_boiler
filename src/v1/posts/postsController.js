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
    const { params } = await validate(req);
    const result = await postsDAL.getRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const { body } = await validate(req);

    const result = await postsDAL.createRecord(body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { params, body } = await validate(req);

    const result = await postsDAL.updateRecord(params.id, body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { params } = await validate(req);
    const result = await postsDAL.deleteRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
