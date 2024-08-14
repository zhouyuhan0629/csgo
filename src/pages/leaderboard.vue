<template>
  <div>
     <h5>League Standings</h5>
     <div class="box">
      <div class="firstRow">
        <span style="text-indent:47px">Team Name</span>
        <span >MP</span>
        <span >GF</span>
        <span >GA</span>
        <span >Points</span>
      </div>
      <div class="rows" v-for="(item, index) in countrysArr" :key="index">
        <div class="teamName" >
            <img :src="item.imgSrc" style="margin-right: 10px" alt="" />
            <span>{{ item.teamName }}</span>
          </div>
        <span>{{item.matchesPlayed}}</span>
        <span>{{item.goalsFor}}</span>
        <span>{{item.goalsAgainst}}</span>
        <span>{{item.points}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, getCurrentInstance, ref, reactive } from "vue";
export default {
  setup() {
    let countrysArr = ref([]);
    const { proxy } = getCurrentInstance();
    const getList = async () => {
      countrysArr.value = await proxy.$leagueService.getLeaderboard();
      countrysArr.value=JSON.parse(JSON.stringify(countrysArr.value)) ;
     countrysArr.value =countrysArr.value.map((ele, ind) => {
        return {
          ...ele,
          imgSrc: `https://flagsapi.codeaid.io/${ele.teamName}.png`
        };
      });
    
     
    };
    onMounted(() => {
      getList();
    });
    return {
      countrysArr,
    };
  },
};
</script>
<style scoped>
.box {
  width: 90%;
  margin: auto;
}
h5 {
    margin:120px auto 20px;
    text-align: center;
  font-size: 24px;
  color: #182c62;
}
.firstRow {
  display: grid;
  grid-template-columns:60% 9% 9% 13% 9%;
  font-weight: 700;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  color: #4b5c68;
  background-color: #e4edf2;
}
.rows {
  height: 70px;
  display: grid;
  line-height: 70px;
  grid-template-columns: 60% 9% 9% 13% 9%;
  border-bottom: 1px solid #e4edf2;
}
.rows .teamName{
    display: flex;
    align-items: center;
    padding-left: 47px;
    font-weight: 700;
    font-size: 16px;
}
.teamName img{
    width: 53px;
  height: 37px;
}
</style>