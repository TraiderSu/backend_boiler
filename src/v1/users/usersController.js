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
    const result = await usersDAL.getRecord(params);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
