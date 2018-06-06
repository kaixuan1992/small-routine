<template>
  <div class="order-box">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="tab-content">
      <div class="order-wrap" v-for="item in orderList">
        <router-link :to="{ path: '/detail',query: { 
                      businessId:businessId,
                      number: item.number
                  } }">
          <div class="list-item border1px">
            <div class="up-title">
              <div class="content-left">
                <span>外卖单</span>
                <span>流水号&nbsp:{{item.id}}</span>
              </div>
              <div class="content-right">
                <span class="iconfont icon-dayinji"></span>
              </div>
            </div>
            <div class="down-title">
              <div class="content-left"><span class="ordere-time">下单于:&nbsp{{item.payTime|TIMEDF()}}</span></div>
              <div class="content-right">微信支付:¥&nbsp{{item.solidFee}}</div>
            </div>
  
          </div>
        </router-link>
      </div>
       <div class="order-more" v-show="moreOrder">
      加载更多...
    </div>
    </div>
   
    <!-- <mt-cell-swipe
                    title="text">
                          <div class="content"></div>
                    </mt-cell-swipe> -->
  </div>
</template>

<script>
 import { Indicator } from 'mint-ui';
  // import moment from "moment"
  import moment from "moment"
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        businessId:'',
        moreOrder: false,
        show:false,
        orderList: []
      }
    },
    created() {
      // let data = ''
      // this.getOrderList(5133)
    },
  
    mounted() {
      // this.params = parseInt(this.$route.params.id)
      // let data = ''
      this.$nextTick(() => {
       window.getOrderList = this.getOrderList;
      })
    },
    methods: {
      getOrderList(data) {
      this.businessId = parseInt(data)
        let self = this
        if (!this.orderList.length) {
          Indicator.open('Loading...');
          $.ajax({
            type: "post",
            url: baseUrl + "/boss/orderList",
            contentType: "application/x-www-form-urlencoded;charset=utf-8;",
            data: {
              businessId: this.businessId,
              pageNum: 1,
              size: this.pageSize,
            },
            success: function(res) {
              // debugger
              // let res = JSON.parse(data)
              if (res.code == 1) {
                Indicator.close();
                self.orderList = res.data.list
                self.total = res.data.total
                if( self.orderList .length > 14){
                  self.moreOrder = true
                }
                //  moment(res.data.createDate).format('YYYY-MM-DD HH:mm:ss')
              }else if(res.code == 500){
                 Indicator.close();
                 Tip(res.message, 3000)

              }
            },
            error: function(error) {
              Indicator.close();
              console("error=" + error);
            }
          });
        } else {
          if (this.pageNum > this.total / this.pageSize) {
  
            this.moreOrder = false
  
            return
          }
          ++this.pageNum
          $.ajax({
            type: "post",
            url: baseUrl + "/boss/orderList",
            contentType: "application/x-www-form-urlencoded;charset=utf-8;",
            data: {
              businessId: this.businessId,
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            },
            success: function(res) {
              // debugger
              // let res = JSON.parse(data)
              if (res.code == 1) {
                // Indicator.close();
                res.data.list.forEach((item) => {
                  self.orderList.push(item);
                })
                //  moment(res.data.createDate).format('YYYY-MM-DD HH:mm:ss')
              }
            },
            error: function(error) {
              console("error=" + error);
            }
          });
        }
  
      },
      loadMore() {
        if(this.businessId){
             this.getOrderList(this.businessId)
        }
      }
    },
  
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .order-box {
    background: #fff;
    font-size: 0.426667rem;
    font-size: 0.373333rem;
    height: 100vh;
    .tab-content {
      height: 100vh;
      overflow: auto;
    }
    // .list-item:active{
    //   background-color:red;
    // }
    .order-wrap {
      background: #fff;
      padding: 0 0.32rem;
      &:active {
        background-color: #ddd;
      }
    }
    .list-item {
      // background:#fff;
      height: 1.866667rem;
      width: 100%;
      padding: 0 0.32rem 0 0.32rem;
      border: 1px solid transparent;
      .up-title {
        height: 0.533333rem;
        line-height: 0.533333rem;
        display: flex;
        flex-flow: row nowrap;
        margin-top: 0.3rem;
        margin-bottom: 0.2rem;
        color: #333;
        .content-left {
          flex: 6;
          justify-content: flex-start;
        }
        .content-right {
          flex: 2;
          justify-content: flex-end;
          text-align: right;
        }
      }
      .down-title {
        height: 0.533333rem;
        line-height: 0.533333rem;
        color: #333333;
        display: flex;
        flex-flow: row nowrap;
        .content-left {
          flex: 6;
          justify-content: flex-start;
          .ordere-time {
            color: #999;
            font-size: 0.373333rem
          }
        }
        .content-right {
          flex: 4;
          // font-size:0.426667rem;
          font-size: 0.373333rem;
          color: #ff4040;
          font-weight: bold;
          justify-content: flex-end;
          text-align: right;
        }
      }
    }
    .order-more {
      background:#EAEAEA;
      height: 40px;
      line-height: 40px;
      font-size: 0.373333rem;
      text-align: center;
    }
  }
</style>
