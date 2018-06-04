<template>
  <div class="order-box">
    <div class="order-wrap"  v-for="item in orderlist">
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
      
    <div class="order-more">
      加载更多...
    </div>
    <!-- <mt-cell-swipe
          title="text">
                <div class="content"></div>
          </mt-cell-swipe> -->
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui';
// import moment from "moment"
import moment from "moment"
	export default {
		data() {
			return {
         pageNum: 1,
         pageSize:10,
         businessId:5133,
         orderlist:[]
         
			}
		},
		created() {
		
		},
	
		mounted() {
			this.params = parseInt(this.$route.params.id)
			this.$nextTick(() => {
				this.getOrderList()
			})
		},
		methods: {
			getOrderList(data) {
							// $('.content').html('34343')
				// Indicator.open('Loading...');
				// let val = parseInt(data)
				let self = this
				$.ajax({
					type: "post",
					url: baseUrl + "/boss/orderList",
          contentType: "application/x-www-form-urlencoded;charset=utf-8;",
					data:{
            businessId:this.businessId,
            pageNum: 1,
					  pageSize: this.pageSize,
					},
					success: function(res) {
						// debugger
						// let res = JSON.parse(data)
						if (res.code == 1) {
              		// Indicator.close();
               self.orderlist = res.data.list
              //  moment(res.data.createDate).format('YYYY-MM-DD HH:mm:ss')
						}
					},
					error: function(error) {
						console("error=" + error);
					}
				});
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .order-box {
    background:#fff;
    font-size: 0.426667rem;
    font-size: 0.373333rem;
    height: 100vh;
    // .list-item:active{
    //   background-color:red;
    // }
    .order-wrap{
       background:#fff;
        padding: 0 0.32rem;
      &:active{
          background-color:#ddd;
      }
    }
    .list-item {
      // background:#fff;
      height: 1.866667rem;
      width:100%;
      padding: 0 0.32rem 0 0.32rem;
      border: 1px solid transparent;
      .up-title {
        height: 0.533333rem;
        line-height: 0.533333rem;
        display: flex;
        flex-flow: row nowrap;
        margin-top: 0.3rem;
        margin-bottom: 0.2rem;
        color:#333;
        .content-left {
          flex: 6;
          justify-content: flex-start;
        }
        .content-right {
          flex: 1;
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
          flex: 2;
          justify-content: flex-start;
          .ordere-time {
            color: #999;
            font-size: 0.373333rem
          }
        }
        .content-right {
          flex: 1;
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
      height: 40px;
      line-height: 40px;
      font-size: 0.373333rem;
      text-align: center;
    }
  }
</style>
