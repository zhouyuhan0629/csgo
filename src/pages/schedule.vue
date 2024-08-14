<template>
  <div class="page">
    <h5>League Schedule</h5>
    <div class="box">
      <div class="firstRow">
        <span class="noif500">Date/Time</span>
        <span class="noif750">stadium</span>
        <div> <span>Home Team</span> <span>Away Team</span></div>
        
      </div>
      <div class="rows" v-for="(item, index) in matches" :key="index">
        <span style="font-size: 14px" class="noif500">{{
          item.matchDate
        }}</span>
        <span style="font-size: 14px" class="noif750">{{ item.stadium }}</span>
        <div style="display: flex">
          <div class="small11">
            <span>{{ item.homeTeam }}</span>
            <img :src="item.src1" style="margin-left: 10px" alt="" />
          </div>
          <div class="small21">
            <span>{{ item.homeTeamScore }} : </span>
            <span>{{ item.awayTeamScore }}</span>
          </div>
          <div class="small31">
            <img :src="item.src2" style="margin-right: 10px" alt="" />
            <span>{{ item.awayTeam }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, getCurrentInstance, ref, reactive } from "vue";
export default {
  setup() {
    let matches = ref([]);
    const { proxy } = getCurrentInstance();
    const fetchMatches = async () => {
      matches.value = await proxy.$leagueService.getMatches();
      matches.value = matches.value.map((ele, ind) => {
        return {
          awayTeam: ele.awayTeam,
          awayTeamScore: ele.awayTeamScore,
          homeTeam: ele.homeTeam,
          homeTeamScore: ele.homeTeamScore,
          matchDate: formatTimestamp(ele.matchDate),
          matchPlayed: ele.matchPlayed,
          stadium: ele.stadium,
          src1: `https://flagsapi.codeaid.io/${ele.homeTeam}.png`,
          src2: `https://flagsapi.codeaid.io/${ele.awayTeam}.png`,
        };
      });
    };
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedDate = `${month}.${day} ${year} ${hours}:${minutes}`;

      return formattedDate;
    };
    onMounted(() => {
      fetchMatches();
    });
    return {
      matches,
    };
  },
};
</script>
<style scoped>
@media (max-width: 1000px) and (min-width: 750px) {
  .noif750 {
    display: none !important;
  }
  .page .firstRow {
    grid-template-columns: 30% 42% 23%;
  }
  .page .rows{
    grid-template-columns: 30% 42% 23%;
  }
  .page .firstRow>div{
    width: 266px;
  }
}

@media (max-width: 750px) and (min-width: 500px) {
  .noif750 {
    display: none !important;
  }
  .page .firstRow {
    grid-template-columns: 40% 42% 23%;
  }
  .page .rows{
    grid-template-columns: 76% 42% 23%;
  }

  .noif500 {
    display: none !important;
  }
}
@media (min-width: 1000px) {
  /* 在这里放置针对500像素宽度的样式 */
}
.noif500{
    text-indent: 47px;
}
[class^="small"] {
  font-weight: 700;
  font-size: 16px;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.small11 {
  text-align: right;
}

.small31 {
  justify-content: flex-start;
}
.small21 {
  text-align: center;
  justify-content: center;
}
.page {
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h5 {
  font-size: 24px;
  color: #182c62;
  margin: 0 auto 20px;
}
.box {
  width: 90%;
}

.firstRow {
  display: grid;
  grid-template-columns: 25% 36% 23%;
  gap: 10px;
  font-weight: 700;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  color: #4b5c68;
  background-color: #e4edf2;
}
.firstRow>div{
    display: flex;
    width: 346px;
    justify-content: space-between;
}
.rows {
  height: 70px;
  display: grid;
  grid-template-columns: 25% 25% 50%;
  gap: 10px;
}
.rows:nth-child(2n-1) {
  background-color: #f6f7f7;
}
.rows span {
  display: inline-block;
  height: 70px;
  line-height: 70px;
}
.rows img {
  width: 53px;
  height: 37px;
}
</style>