<template>
  <div class="detail-box">
    <div class="detail-head">
      <div class="left-head">外卖单 ¥&nbsp {{solidFee}}</div>
      <div class="right-head">{{status}}</div>
    </div>
    <div class="order-info border1px">
      <div class="person-infor">
        <div class="person-left"><span>{{name}}</span><span>&nbsp{{gender}}&nbsp</span><span>{{mobile}}</span></div>
        <div class="person-right">
          <a :href='"tel:" + mobile'> <span class="iconfont icon-dianhua"></span></a>
        </div>
      </div>
      <div class="person-address">{{address}}</div>
    </div>
    <div class="order-detail borderbefore-1px">
      <div class="order-head">
        <div class="order-first">商品</div>
        <div>数量</div>
        <div>单价</div>
        <!-- <div>总价</div> -->
      </div>
      <div class="order-content" v-for="item in distList">
        <!-- <div>麻辣小龙虾</div> -->
        <div class="order-first">{{item.dishName}}</div>
        <div>{{item.count}}</div>
        <div>{{item.price}}</div>
          <!-- <div>{{item.price}}</div> -->
      </div>
      <div class="border1px splitLine"></div>
      <div class="extra border1px">
        <div class="extra-box">
          <div class="extra-left">包装盒</div>
          <div class="extra-right">{{boxFee}}</div>
        </div>
        <div class="extra-box">
          <div class="extra-left">配送费</div>
          <div class="extra-right">{{sendFee}}</div>
        </div>
      </div>
      <div class="price">
        <div class="price-left"></div>
        <div class="price-right">{{solidFee}}</div>
      </div>
    </div>
    <div class="remarks-wrap borderbefore-1px">
      <div class="remarks-title">备注&nbsp:</div>
      <div class="remarks-content">{{mark}}</div>
    </div>
    <div class="sign-box">
      <div class="sign-wrap">
        <div class="sign-left">流水号</div>
        <div class="sign-right">{{id}}</div>
      </div>
      <div class="sign-wrap">
        <div class="sign-left">订单号</div>
        <div class="sign-right">{{orderNumber}}</div>
      </div>
      <div class="sign-wrap">
        <div class="sign-left">订单时间</div>
        <div class="sign-right">{{createTime}}</div>
      </div>
    </div>
    <!-- <div class="quit-button" @click="quitMoney">退款</div> -->
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
        solidFee: '',
        solidFe: '',
        name: '',
        mobile: '',
        gender: '',
        distList: [],
        boxFee: '',
        sendFee: '',
        mark: '',
        id: '',
        number: '',
        payTime: '',
        createTime: '',
        address: '',
        status: '',
        orderNumber: '',
        businessId: 5513
  
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
              // console.log()
              self.solidFee = res.data.solidFee
              self.name = res.data.addressInfo.name
              self.mobile = res.data.addressInfo.mobile
              self.address = res.data.addressInfo.address
              self.distList = res.data.dishs;
              self.boxFee = res.data.boxFee
              self.sendFee = res.data.sendFee
              self.gender = res.data.gender ? '先生' : '小姐'
              self.mark = res.data.mark
              self.id = res.data.id
              self.orderNumber = res.data.number
              self.payTime = res.data.PayTime
              self.createTime = res.data.createTime
              // self.status = res.data.status
              switch (res.data.status) {
                case 0:
                  self.status = '待支付'
                  break
                case 1:
                  self.status = '已支付'
                  break
                case 2:
                  self.status = '已取消'
                  break
              }
              Indicator.close()
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
            businessId: parseInt(this.businessId),
            number: this.number
          },
          success: function(res) {
            if (res.code == 1) {
              Tip('退款失败', 1000, 'top');
              Indicator.close();
            } else {
              Tip(res.message, 1000, 'top');
            }
          },
          error: function(error) {
            console.log(error)
          }
        });
      },
      back() {
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
          flex: 9;
        }
        .person-right {
          flex: 1;
          .icon-dianhua {
            color: #999;
            position: relative;
            left: 12px;
            font-size: 18px;
          }
          a {
            display: inline-block;
            width: 50px;
            height: 50px;
            // background:red;
          }
        }
      }
      .person-address {
        height: 0.72rem;
        line-height: 0.72rem;
        letter-spacing: 2px;
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
          flex: 1;
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
          flex: 2;
          color: #666666;
          font-weight: bold;
        }
        .sign-right {
          flex: 4;
          text-align: right;
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
