/**
 * @swagger
 *
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *         uniqueItems: true
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 *
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get users list
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/User"
 *
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *
 */
