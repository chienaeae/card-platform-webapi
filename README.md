# 使用者交易平台 API

## 交易撮合說明

1. 買入訂單 (buy order) 進入平台時，若平台中存在比該買入價格【更低或相同】的賣出訂單時，則以該賣出訂單的價格撮合 (trade made)。

2. 賣出訂單 (sell order) 進入平台時，若平台存在比該賣出價格【更高或相同】的買入訂單時，則以該買入訂單的價格撮合 (trade made)。


## 訂單處理架構

![image](https://github.com/chienaeae/card-platform-webapi/blob/feature/viewCardAPI/pic/order_process_graph.jpg)


1. 當 Web API 收到訂單訊息後即生成未處理訂單 (idle)，並將處理訊息送入 SQS FIFO管道中。

2. Ordering Process 對 SQS FIFO 進行長輪詢，當收到處理訊息後將與其他已處理訂單 (processed) 進行撮合。

3. 若不存在可撮合對象成功，則未處理訂單將變更為已處理訂單(processed)，等待未來與其他進行撮合；若撮合成功，兩訂單的狀態將改變為已解決 (completed)。

