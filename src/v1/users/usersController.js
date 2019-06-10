import * as usersDAL from './usersDAL';
import { validate } from './User';

export const getList = async (req, res, next) => {
  try {
    const { query } = await validate(req);
    const result = await usersDAL.getRecordList(query);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const { params } = await validate(req);
    const result = await usersDAL.getRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const { body } = await validate(req);

    const result = await usersDAL.createRecord(body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { params, body } = await validate(req);

    const result = await usersDAL.updateRecord(params.id, body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { params } = await validate(req);
    const result = await usersDAL.deleteRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
