import * as postsDAL from './postsDAL';
import { validate } from './Post';
import { ForbiddenError, NotFoundError } from '../../services/errorService';

export const getList = async (req, res, next) => {
  try {
    const { query } = await validate(req);
    const result = await postsDAL.getRecordList(query);

    res.status(200).json(result);
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
    const { id: user_id } = req.currentUser;

    const result = await postsDAL.createRecord({ ...body, user_id });
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { params, body } = await validate(req);
    const { id: user_id } = req.currentUser;

    const existRecord = await postsDAL.getRecord(params.id);

    if (!existRecord) {
      throw new NotFoundError();
    }

    if (existRecord.user_id !== user_id) {
      throw new ForbiddenError();
    }

    const result = await postsDAL.updateRecord(params.id, body);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { params } = await validate(req);
    const { id: user_id } = req.currentUser;

    const existRecord = await postsDAL.getRecord(params.id);

    if (!existRecord) {
      throw new NotFoundError();
    }

    if (existRecord.user_id !== user_id) {
      throw new ForbiddenError();
    }

    const result = await postsDAL.deleteRecord(params.id);

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
