<template>
  <div class="detail-box">
    <div class="detail-head">
      <div class="left-head">外卖单 ¥94.00</div>
      <div class="right-head">已支付</div>
    </div>
    <div class="order-info border1px">
      <div class="person-infor">
        <div class="person-left"><span>吴笑阔</span><span>先生</span><span> 187987987987</span></div>
        <div class="person-right">
          <span class="iconfont icon-dianhua"></span>
        </div>
      </div>
      <div class="person-address">杭州EFC落客行政公寓</div>
    </div>
    <div class="order-detail borderbefore-1px">
      <div class="order-head">
        <div>商品</div>
        <div>数量</div>
        <div>单价</div>
        <div>总价</div>
      </div>
      <div class="order-content" v-for="n in 5">
        <div>麻辣小龙虾</div>
        <div>1</div>
        <div>39</div>
        <div>39</div>
      </div>
      <div class="border1px splitLine"></div>
      <div class="extra border1px">
        <div class="extra-box">
          <div class="extra-left">包装盒</div>
          <div class="extra-right">1</div>
        </div>
        <div class="extra-box">
          <div class="extra-left">包装盒</div>
          <div class="extra-right">1</div>
        </div>
      </div>
      <div class="price">
        <div class="price-left"></div>
        <div class="price-right">¥94</div>
      </div>
    </div>
    <div class="remarks-wrap borderbefore-1px">
      <div class="remarks-title">备注&nbsp:</div>
      <div class="remarks-content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
    </div>
    <div class="sign-box">
      <div class="sign-wrap" v-for="n in 3">
        <div class="sign-left">流水号</div>
        <div class="sign-right">11111</div>
      </div>
    </div>
    <div class="quit-button" @click="quitMoney">退款</div>
  </div>
</template>

<script>
  import {
    Indicator
  } from 'mint-ui';
  import moment from "moment"
  export default {
    data() {
      return {
        scrolldistance: 0,
        datailcontent: '',
        newsTitle: '',
        mediaUrl: '',
        homeImage: '',
        createTime: '',
        stars: '',
        isadd: false,
        addnumber: 0,
        imgshow: true,
        isdetail: false
      }
    },
    created() {
      // this.getdetail(this.params)
      // console.log(this.$route.params)
      // this.scrolldistance = document.documentElement.scrollTop || document.body.scrollTop;
      // document.body.scrollTop = 0
      // document.documentElement.scrollTop = 0
    },
  
    mounted() {
      this.number = this.$route.query.number
      this.businessId = this.$route.query.businessId
      this.$nextTick(() => {
        this.getdetail(this.number, this.businessId)
  
      })
    },
    methods: {
      getdetail(number, id) {
        // $('.content').html('34343')
        // Indicator.open('Loading...');
        // let val = parseInt(data)
        let self = this
        $.ajax({
          type: "post",
          url: baseUrl + "/boss/orderDetail",
          contentType: "application/x-www-form-urlencoded;charset=utf-8;",
          data: {
            businessId: parseInt(id),
            number: number
          },
          success: function(res) {
            // debugger
            // let res = JSON.parse(data)
            if (res.code == 1) {
              // self.homeImage = res.data.homeImage
              // if (res.data.catId == 1) {
              // 	self.imgshow = true
              // 	self.homeImage = res.data.homeImage
              // } else {
              // 	self.imgshow = false
              // 	self.mediaUrl = res.data.mediaUrl
              // }
              Indicator.close();
              self.isdetail = true
              let date = new Date(res.data.createDate)
              self.createTime = moment(res.data.createDate).format('YYYY-MM-DD HH:mm:ss')
              self.newsTitle = res.data.newsTitle
              self.stars = res.data.stars
  
              // console.log(this.createDate)
              console.log($('#content1'), "res.data.newsHtml")
              $('#content').html('34343')
              $('#content').html(res.data.newsHtml)
              // console.log(res.data.newsHtml, "res.data")
              // res.data.forEach((item)=>{
              //     self.dataItem  = item.data;
              //     console.log(self.dataItem,"self.dataItem")
              //      console.log(item)
              //     if(item.headFlag){
              //         self.topitem = item
              //     }
              // })
              //    console.log("huo")
            }
          },
          error: function(error) {
            console("error=" + error);
          }
        });
      },
      quitMoney() {
        $.ajax({
          type: "post",
          url: baseUrl + "/boss/orderRefund",
          contentType: "application/x-www-form-urlencoded;charset=utf-8;",
          data: {
            businessId: parseInt(id),
            number: number
          },
          success: function(res) {
            if (res.code == 1) {
              Indicator.close();
            }
          },
          error: function(error) {
            console("error=" + error);
          }
        });
      },
      back() {
        console.log(2222)
        this.$router.back()
        document.body.scrollTop = this.scrolldistance
        document.documentElement.scrollTop = this.scrolldistance
      }
    }
  }
</script>

<style scoped lang="scss">
  .detail-box {
    // height: 150vh;
    height: 100%;
    width: 100%;
    background-color: #EAEAEA;
    margin-bottom: 10px;
    padding: 0 0 0.32rem 0;
    .detail-head {
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.426667rem;
      color: #333;
      display: flex;
      padding: 0 0.32rem;
      .left-head {
        flex: 1;
        text-align: left;
      }
      .right-head {
        flex: 1;
        text-align: right;
      }
    }
    .order-info {
      // height:1.786667rem;
      background: #fff;
      font-size: 0.426667rem;
      // border:1px solid ;
      padding: 0.32rem;
      .person-infor {
        display: flex;
        height: 0.72rem;
        line-height: 0.72rem;
        .person-left {
          flex: 4;
        }
        .person-right {
          flex: 1;
        }
      }
      .person-address {
        height: 0.72rem;
        line-height: 0.72rem;
        // margin:10px;
      }
    }
    .order-detail {
      border: 1px solid transparent;
      margin-top: 10px;
      // padding:0.32rem 0;
      padding: 0.32rem 0 0 0;
      background: #fff;
      .order-head {
        font-size: 0.426667rem;
        height: 0.72rem;
        line-height: 0.72rem;
        display: flex;
        div {
          flex: 1;
          text-align: center;
        }
      }
      .order-content {
        color: #999;
        font-size: 0.373333rem;
        height: 0.72rem;
        line-height: 0.72rem;
        display: flex;
        div {
          flex: 1px;
          text-align: center;
        }
      }
      .splitLine {
        margin-top: 0.32rem;
      }
      .extra {
        padding: 0.1rem 0.32rem;
        .extra-box {
          color: #333;
          font-size: 0.373333rem;
          height: 0.82rem;
          line-height: 0.82rem;
          display: flex;
          .extra-left {
            flex: 4;
            text-align: left;
          }
          .extra-right {
            flex: 1;
            text-align: center;
          }
        }
      }
      .price {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.373333rem;
        font-weight: bold;
        letter-spacing: 1px;
        display: flex;
        padding: 0 0.32rem;
        color: #ff4040;
        .price-left {
          flex: 4;
          // flex-flow: flext-end;
        }
        .price-right {
          flex: 1;
          text-align: center;
        }
      }
    }
    .remarks-wrap {
      margin-top: 10px;
      // min-height: 80px;
      background-color: #fff;
      padding: 0.32rem;
      display: flex;
      font-size: 0.373333rem;
      .remarks-title {
        flex: 1;
        color: #666666;
        font-weight: bold;
        // text-align:center;
      }
      .remarks-content {
        flex: 7;
        letter-spacing: 1px;
      }
    }
    .sign-box {
      margin-top: 10px;
      background-color: #fff;
      padding: 0.32rem;
      font-size: 0.373333rem;
      .sign-wrap {
        height: 0.72rem;
        line-height: 0.72rem;
        display: flex;
        .sign-left {
          flex: 4;
          color: #666666;
          font-weight: bold;
        }
        .sign-right {
          flex: 1;
          text-align: center;
        }
      }
    }
    .quit-button {
      // position: absolute;
      // bottom:10px;
      // left:50%;
      // transform: translate(-50%);
      height: 38px;
      line-height: 38px;
      width: 94px;
      background-color: #ffba00;
      text-align: center;
      // margin:20px auto;
      // margin-top:10px;
      margin: 10px auto 0 auto;
      border-radius: 8px;
      color: #fff;
      font-size: 0.426667rem;
    }
  }
</style>
