/**
 * @swagger
 *
 * definitions:
 *   Auth:
 *     properties:
 *       id:
 *         type: integer
 *         uniqueItems: true
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 *
 * /signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signup
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           password_confirmation:
 *             type: string
 *
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Auth"
 *
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signup
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Auth"
 *
 *
 *
 */
