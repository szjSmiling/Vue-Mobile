<template>
	<div id="t-wrapper">
		<head-top class="header">
			<i slot="left" class="iconfont icon-back"></i>
			<span slot="title" class="title">Bookings</span>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
      <div class="t-trip-control-btn flex space-between align-items-center">
				<div class="t-btn-wrap flex align-items-center" v-for="item in titleList" :key="item.id" :class="{active:item.active}">
					<a @click="showTypeOrders(item.id)">{{item.title}}</a>
				</div>
			</div>
      <div class="trip-mark">
        <p><span>Results of range:</span>create time within 30 min</p>
      </div>
			<div class="trip-content" v-if="orderList.length != 0">
				<div class="section flex" v-for="(item,idx) in orderList" :key="item.id" @click="searchOrderDetail(item,idx)">
					<div class="dateTime flex">
						<h2>{{new Date(item.bookOn).getDate()}}</h2>
						<h3>{{TimeFormatUtil.getMonthDescription(new Date(item.bookOn).getMonth()).replace(/\./g,'')}}</h3>
					</div>
					<div class="bookInfo">
						<div class="tripID">
							<span>Trip Id:{{item.flightItineraryIdString}}</span>
						</div>
						<div class="city flex">
							<span class="fromCity">{{item.departCity}}</span>
							<span class="arive"></span>
							<span class="toCity">{{item.arriveCity}}</span>
						</div>
						<div class="orderDate">
							<span>Order date:{{TimeFormatUtil.getMonthDescription(new Date(item.departDateTime).getMonth()).replace(/\./g,'')}} {{new Date(item.departDateTime).getDate()}}</span>
						</div>
					</div>
					<div class="orderType" :class="statuClass(item.bookStatus)">
						<span>{{item.bookStatus}}</span>
					</div>
				</div>
			</div>
			<div class="noOrder" v-else>
				<p>No relevent records</p>
			</div>
		</div>
    <pagination v-if="orderList.length != 0" :pagination="pagination" @currentPageData="currentPageData"></pagination>
	</div>
</template>
<script>
import { User } from "../../models/user";
import { TimeFormatUtil, OrderStatusUtil } from "../../models/utils";
import headTop from "../../components/head/head.vue";
import pagination from "../../components/pagination/pagination.vue";
import { FlightOrder } from "../../models/flightorder";
import { Toast, Indicator } from "mint-ui";
import { CookieUtil } from "../../models/utils";
import { DomainManager } from '../../config/DomainManager';

export default {
  components: {
    headTop,
    pagination
  },
  data() {
    return {
      TimeFormatUtil,
      orderList: [],
      orders: null,
      orderFee: null,
      needNo: false,
      condition:{},
      pagination:{},
      titleList: [
        { id: 0, title: "To be paid", active: true },
        { id: 1, title: "Upcoming", active: false },
        { id: 2, title: "Completed", active: false },
        { id: 3, title: "Canceled", active: false }
      ],
      orderObj:{
        status:'To be paid',
        pageNum:1,
        pageSize:8,
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (to.path.indexOf("/bridge") > -1) {
      try {
        window.heg.nativeBack();
      } catch (e) {}
    }
    next();
  },
  methods: {
    searchOrder(params){
      Indicator.open({
        text:'Searching . . .',
        spinnerType: "fading-circle"
      });
      let url = DomainManager.getOrderNew();
      this.$axios.post(url,params).then(res =>{
        if(res.succ){
          Indicator.close();
          this.orderList = res.data.list;
          this.pagination = Object.assign({}, this.pagination, {//   添加多个属性方法
            totalSize: res.data.totalSize,
            pageSize:this.orderObj.pageSize
          });
        }else{
          Indicator.close();
          Toast({
            message:res.msg,
            duration:1200
          });
        }
      }).catch(err => {
        console.log(err);
        Indicator.close();
      });
    },
    showTypeOrders(type) {
      for (let val in this.titleList) {
        this.titleList[val].active = false;
      }
      this.titleList[type].active = true;
      this.$set(this.orderObj,'status',this.titleList[type].title);
      this.orderList = [];
      this.searchOrder(this.orderObj);
    },
    currentPageData(data){
      this.orderObj.pageNum = data;
      this.searchOrder(this.orderObj);
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    setCookie: function(cname, cvalue, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cname +
        "=" +
        escape(cvalue) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());

      // document.cookie = cname + "=" + cvalue + "; ";
      // console.log(document.cookie);
    },
    searchOrderDetail(item, index) {
      Indicator.open({
        spinnerType: "fading-circle"
      });
      let orderId = item.flightOrderIdString;
      let url;
      if (!CookieUtil.hasItem("uuid")) {
        this.needNo = false;
        url = DomainManager.getOrderDetailNew()+'?tripId='+item.flightItineraryIdString+'&token='+JSON.parse(sessionStorage.getItem('searchCondition')).token+'&emailOrPhone='+JSON.parse(sessionStorage.getItem('searchCondition')).emailOrPhone;
      } else {
        this.needNo = true;
        url = DomainManager.getOrderDetailNew()+'?tripId='+item.flightItineraryIdString;
      }
      // tripId,单程和orderId一致,往返则是同一个orderId,但tripI的不一致.
      this.$axios.get(url).then(json => {
        // console.log(json)
        this.orders = json.data.triplist;
        this.orderFee = json.data.order;
        sessionStorage.removeItem("orders");
        sessionStorage.removeItem("orderFee");
        sessionStorage.removeItem("orderId");
        sessionStorage.removeItem("orderInsurance");

        sessionStorage.setItem("orders", JSON.stringify(this.orders));
        sessionStorage.setItem("orderFee", JSON.stringify(this.orderFee));
        sessionStorage.setItem("orderId", orderId);
        sessionStorage.setItem("orderInsurance",JSON.stringify(json.data.flightInsuranceDtos));
        let status;
        for (let obj in this.orders.ticketsinfo) {
          status = this.orders[0].ticketsinfo[obj][0].status;
        }
        if (
          status == 107 ||
          this.orders[0].payStatus == 0 ||
          this.orders[0].payStatus == 9 ||
          this.orders[0].payStatus == 3 ||
          this.orders[0].payStatus == 4
        ) {
          this.$router.push("/order/nopay");
        } else if (status == 106) {
          this.$router.push("/order/complete");
        } else {
          this.$router.push("/order/upcoming");
        }
        Indicator.close();
      }).catch(err => {
        console.log(err);
        Indicator.close();
      });
    },
    statuClass(item) {
      return OrderStatusUtil.getOrderClass(item);
    },
  },
  created() {
    try {
      let uuid = window.heg.getNativeUuid();
      if (uuid != null && uuid != "") {
        this.setCookie("uuid", uuid, 1);
      }
    } catch (e) {}
  },
  mounted () {
    this.condition = JSON.parse(sessionStorage.getItem('searchCondition'));
    if(CookieUtil.getItem('uuid')){
      this.searchOrder(this.orderObj);
    }else{
      for(let i in this.condition){
        this.$set(this.orderObj,i,this.condition[i]);
      }
      this.searchOrder(this.orderObj);
    }
  }
};
</script>
<style lang="less" scoped>
#t-wrapper {
  .header {
    background: #0b9d78;
    z-index: 12;
    .title {
      color: #fff;
      font-size: 0.768rem;
    }
    .sp {
      opacity: 0;
    }
  }
  .container {
    .trip-content {
      padding: 5.5rem 0.68rem 2rem;
    }
    .trip-mark {
      position: fixed;
      padding-top:3.706rem;
      z-index: 10;
      background: #fff;
      p {
        color: #333;
        font-size: 0.512rem;
        padding: 0.534rem 0.68rem;
        border-bottom: 1px solid #eff8f6;
        text-align: left;
      }
      span {
        color: #0b9d78;
        margin-right: 0.3rem;
      }
    }
    .t-trip-control-btn {
      width: 100%;
      height: 1.706rem;
      padding-top: 2rem;
      position: fixed;
      z-index: 11;
      .t-btn-wrap {
        width: 50%;
        height: 100%;
        background: #ebebeb;
        box-sizing: border-box;
      }
      a {
        width: 100%;
        padding: 0.52rem 0;
        display: block;
        flex: 1;
        color: #999;
        font-size: 0.597rem;
        letter-spacing: 0.5px;
        border-right: 1px solid #fff;
      }
      .active {
        a {
          color: #fff;
          border-right: none;
        }
        background: #ffad3d;
      }
      .t-btn-wrap:last-child {
        a {
          border-right: none;
        }
      }
    }
  }
  .upcoming {
    background-color: #d4efe8;
  }

  .paid {
    background-color: #ffeac5;
  }

  .complete {
    background-color: #ceebe4;
  }
  .canceled{
    background-color: #ccc;
  }
  .section {
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 0.2rem 0.3rem #ddd;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.4rem;
    .dateTime {
      width: 2.6rem;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-right: 1px solid #ddd;
      h2 {
        font-size: 1.02rem;
      }
      h3 {
        font-size: 0.6rem;
        color: #ccc;
      }
    }
    .bookInfo {
      .tripID {
        font-size: 0.56rem;
        color: #ccc;
        text-align: left;
        padding: 0.2rem;
        border-bottom: 1px dashed #ddd;
      }
      .city {
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
        span {
          font-size: 0.6rem;
          color: #333;
        }
        .arive {
          height: 0.4rem;
          width: 1.2rem;
          padding: 0 0.4rem;
          background: url("../../assets/images/re-flight_07.png") center
            no-repeat;
          background-size: 1.2rem;
        }
      }
      .orderDate {
        font-size: 0.6rem;
        color: #ccc;
        text-align: left;
        padding: 0 0.2rem 0.6rem;
      }
    }
    .orderType {
      position: absolute;
      right: -1px;
      bottom: -1px;
      font-size: 0.5rem;
      padding: 0.2rem 0.4rem;
      background-color: #efefef;
      color: #ccc;
    }
  }

  .container .noOrder {
    height: 7.2rem;
    background: url("../../assets/images/pnr_03.jpg") center no-repeat;
    background-size: 12.2rem;
    margin-top: 7.2rem;
    padding: 0;
    p {
      font-size: 0.6rem;
      color: #666;
      padding-top: 7.2rem;
    }
  }
}
</style>
