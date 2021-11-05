# 設定 AWS 服務
本篇教學如何為程式設定 AWS 服務。

## 所需 AWS 服務一覽
- Elastic Container Registry
- Elastic Container Service
- CodePipeline
- RDS
- SimpleQueueService

# 設定步驟
## Elastic Container Registry
#### 1. 於 ECR 中建立對應 repository
共有兩個 repo 需要建立：
> a. card-platform-webapi
> 
> b. card-platform-ordering-process

## ELB

#### 1. 建立 Target Group 
target type: Instances

Target group name: cp-back-web-lb-target-group

Protocol Port: HTTP:80

Protocol version: HTTP1

#### 2. 建立 Security Group 
Security group name: cp-back-web-lb-sg

Description: _<描述：用於 Card Platform Web API 之 Load Balancer 的網路群組>_

Inbound rules: 
- HTTP/Anywhere
- HTTPS/Anywhere

Tags:
- Name:cp-back-web-lb-sg

#### 3. 建立 Card Platform Web API Load Balancer
Load balancer types: Application Load Balancer

Load balancer name: cp-back-web-lb

Schema: Internet-facing

IP address type: IPv4

Security groups:
- cp-back-web-lb-sg

Listeners and routing:
- HTTP:80 > cp-back-web-lb-target-group
- HTTPS:443 > cp-back-web-lb-target-group

Security policy: ELBSecurityPolicy-2016-08

Default SSL certificate: From ACM: _<設定之ACM certificate>_

## Elastic Container Service
### 部署 Card Platform Web API 服務
#### 1. 設定執行個體/ECS中 的security group
Security group name: cp-back-web-sg

Description: Card Platform Security Group for Web API Application Instances

Inbound rules:
- All traffic/Custom/cp-back-web-lb-sg

#### 2. 建立 cp-back-web-cluster 的 Cluster
Cluster name: cp-back-web-cluster

Provisioning Model: Spot

Spot Instance allocation strategy: Diversified

EC2 instance types: _<依需求設定其他EC2執行個體種類>_

Maximum price: _<依照EC2執行個體種類設定最高預算>_

Number of instances: _<依需求調整執行個體數量>_

Key pair: _<設定連線EC2之金鑰>_

Auto assign public IP: Enabled

Security group: cp-back-web-sg

(以下使用預設Role，用於**在 container instance 中作為代理人(agent)**)  
Container instance IAM role: ecsInstanceRole

(以下使用預設Role，用於**授權ECS創建 Spot Fleet requests**)  
IAM role for a Spot Fleet request: aws-ec2-spot-fleet-tagging-role

### 部署 Card Platform Ordering Process APP 服務
#### 1. 設定執行個體/ECS中 的security group
#### 2. 建立 cp-ordering-process-service 的 Cluster



## CodePipeline
需要設定兩組 Pipeline 進行自動化部署，分別為:
- Card Platform Web API
- Card Platform Ordering Process APP  

#### 1. 分別準備 build 的參數設定
##### Card Platform Web API
> AWS_ACCOUNT_ID=777386378794  
> AWS_DEFAULT_REGION=ap-northeast-1  
> CONTAINER_NAME=cp-back-web  
> IMAGE_REPO_NAME=cp-back-web  
> IMAGE_TAG=latest  
> GIT_URL=git@github.com:chienaeae/card-platform-webapi.git  
> GIT_RESOLVED_BRANCH=main  

##### Card Platform Ordering Process APP
> AWS_ACCOUNT_ID=777386378794  
> AWS_DEFAULT_REGION=ap-northeast-1  
> CONTAINER_NAME=cp-ordering-process-service  
> IMAGE_REPO_NAME=cp-ordering-process-service  
> IMAGE_TAG=latest  
> GIT_URL=git@github.com:chienaeae/card-platform-ordering-process.git  
> GIT_RESOLVED_BRANCH=main  

#### 2. 設定 Pipeline 執行 Role
##### Card Platform Web API
Pipeline name: cp-back-web-pipeline  

(會自動產生，並為執行 pipeline 的 Role)  
Role name: AWSCodePipelineServiceRole-ap-northeast-1-cp-back-web-pipeline  

(於 GitHub commit 後自動化持續整合)  
Source provider: GitHub(Version 2)

(與在GitHub進行連線的資源)    
Connection: arn:aws:codestar-connections:ap-northeast-1:777386378794:connection/59dd8105-28ac-42fa-9164-2d1c60e0d4c3

(對應 GitHub repo)  
Repository name: chienaeae/card-platform-webapi  

(設定在 GitHub 中持續整合的分支)  
Branch name: main  

Build provider: AWS CodeBuild  

Region Asia Pacific(Tokyo)  

Project name: cp-back-web  

(設定在 buildspec.yml 檔案中所讀取參數)  
Environment variables: _<將 上述1.步驟中 Card Platform Web API 的參數帶入>_



##### Card Platform Ordering Process APP
cp-ordering-process-service-pipeline