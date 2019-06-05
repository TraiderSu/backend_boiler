/**
 * @swagger
 *
 * definitions:
 *   Post:
 *     properties:
 *       id:
 *         type: integer
 *         uniqueItems: true
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 *
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get posts list
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Post"
 *
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get post
 *     parameters:
 *     - name: id
 *       in: "path"
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Post"
 *
 *
 */
