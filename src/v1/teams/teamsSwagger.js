/**
 * @swagger
 *
 * definitions:
 *   Team:
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
 * /teams:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get teams list
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/Team"
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create team
 *     parameters:
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           description:
 *             type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Team"
 *
 * /teams/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get team
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Team"
 *   patch:
 *     tags:
 *       - Teams
 *     summary: Update team
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *     - name: body
 *       in: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           description:
 *             type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Team"
 *
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Delete team
 *     parameters:
 *     - name: id
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Team"
 *
 */
