import * as teamsDAL from './teamsDAL';
import { validate } from './Team';

export const getList = async (req, res, next) => {
  try {
    const { query } = await validate(req);
    const result = await teamsDAL.getRecordList(query);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const { params } = await validate(req);
    const result = await teamsDAL.getRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const { body } = await validate(req);

    const result = await teamsDAL.createRecord(body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { params, body } = await validate(req);

    const result = await teamsDAL.updateRecord(params.id, body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { params } = await validate(req);
    const result = await teamsDAL.deleteRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
