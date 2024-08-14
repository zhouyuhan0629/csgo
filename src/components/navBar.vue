<template>
  <div class="page">
    <div class="left">
        <img src="../../public/images/logo.svg" alt="">
    </div>
    <div class="right">
       <a href="/"> <img src="../../public/images/schedule.png" alt=""> <span style="margin-right:40px" >Schedule</span></a>
        <a href="/leaderboard"> <img src="../../public/images/leaderboard.png" alt=""> <span>Leaderboard</span></a>
    </div>
  </div>
</template>
<script >
export default {
  setup() {
  },
};
</script>
<style scoped>
.page{
    padding: 0 40px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    top: 0;
    background-color: #025FEB;
}
.left{
    width: 110px;
}
.right{
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
}
.right a{
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
}
.right img{
   width: 25px;
   height: 25px;
   margin-right: 5px;
}
.right span{
   height: 25px;
   line-height: 25px;
}
</style>