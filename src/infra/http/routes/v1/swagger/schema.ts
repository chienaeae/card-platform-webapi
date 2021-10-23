/**
 * @swagger
 * components:
 *   schemas:
 *     CardRequest:
 *       type: object
 *       properties:
 *         cardName:
 *           required: true
 *           type: string
 *           example: "Squirtle"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CardOrderRequest:
 *       type: object
 *       properties:
 *         price:
 *           type: number
 *           format: float
 *           description: 訂單價錢
 *           example: 5.0
 *         type:
 *           type: string
 *           description: |
 *             訂單類別:
 *             - buy 買入訂單
 *             - sell 賣出訂單
 *           example: buy
 *         cardIndex:
 *           type: number
 *           format: integer
 *           description: 訂單卡片類別 index
 *           example: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CardOrderStatusResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 訂單ID
 *           example: 08a3b88e-9dd1-4777-a7d0-d06f74446b1b
 *         price:
 *           type: number
 *           format: float
 *           description: 訂單價錢
 *           example: 5.0
 *         type:
 *           type: string
 *           description: |
 *             訂單類別:
 *               - buy 買入訂單
 *               - sell 賣出訂單
 *           example: buy
 *         cardIndex:
 *           type: number
 *           format: integer
 *           description: 訂單卡片類別 index
 *           example: 1
 *         orderedTime:
 *           type: number
 *           format: long
 *           description: 下訂時間 (UTC timestamp in milliseconds)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     orderTradeStatusResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 成交訂單ID
 *           example: 08a3b88e-9dd1-4777-a7d0-d06f74446b1b
 *         price:
 *           type: number
 *           format: float
 *           description: 成交價
 *           example: 5.0
 *         cardIndex:
 *           type: number
 *           format: integer
 *           description: 訂單卡片類別 index
 *           example: 1
 *         buyOrderId:
 *           type: string
 *           description: 買入訂單ID
 *           example: 08a3b88e-9dd1-4777-a7d0-d06f74446b1b
 *         sellOrderId:
 *           type: string
 *           description: 買入訂單ID
 *           example: 08a3b88e-9dd1-4777-a7d0-d06f74446b1b
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     loginResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           required: true
 *           type: string
 *           example: |
 *             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2
 *             VybmFtZSI6IiIsInVzZXJJZCI6IjFlNTZhYTZjLWM0ODktNDc2Yy
 *             04ZjY2LTE4Y2IxZjBiMjFhNiIsImVtYWlsIjoidGVzdDFAZ21haW
 *             wuY29tIiwiaWF0IjoxNjM0OTY0MDEwLCJleHAiOjE2MzQ5NzQ4MT
 *             AsImlzcyI6ImNhcmQtcGxhdGZvcm0ucGhpbGx5em9uZS5pbmZvIn
 *             0.LxTnGhkwl7wllXlDgnTvMxTU24NmWVgAsWGjatROW2A
 */