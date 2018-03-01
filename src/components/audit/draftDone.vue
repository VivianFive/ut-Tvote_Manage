<style>
  #draftDone{
    padding-bottom: 100px;
  }
</style>
<template>
  <div id="draftDone">
    <div class="filter-container">
      <Form>
        <FormItem>
          <div class="filter-header">
            <div class="date-filter">
              <span style="padding: 10px 12px 10px 0">创建时间：</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(date) => {filterReq.startTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
              <span> 至 </span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(date) => {filterReq.endTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            </div>
            <div class="search-filter">
              <Input placeholder="用户ID/提案名称、ID" v-model="filterReq.name" style="width: 250px"></Input>
              <Button type="primary" @click="filterHandle">查询</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="提案类型：" :inline="true" :label-width='72'>
          <RadioGroup type="button" v-model="typeRadio" @on-change="filterHandle">
            <Radio label="all">全部</Radio>
            <Radio label=0>全民公决</Radio>
            <Radio label=1>群体智能</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态：" :inline="true"  :label-width='72'>
          <RadioGroup type="button" v-model="statusRadio" @on-change="filterHandle">
            <Radio label='all'>全部</Radio>
            <Radio label=0>不通过</Radio>
            <Radio label=1>通过</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
    <draft-table :tableData="tableData" tableType="done"></draft-table>
    <div style="margin: 10px;text-align: right">
      <div style="display: inline-block">
        <Page :current.sync="currentPageNum" :total="tableData.total" @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) => pageChange(n,0)" :page-size-opts="[10,20,30]" show-elevator show-sizer></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import draftTable from '@/components/audit/draftTable'
  import { doneList } from '@/api'
    export default {
      components: {
        draftTable
      },
      props: {
        typeList: {
          type: Array
        },
        statusList: {
          type: Array
        }
      },
      data() {
        return {
          tableData: {},
          typeRadio: 'all',
          statusRadio: 'all',
          currentPageNum:1, //当前页数
          filterReq: {
            limit: 10, //每页条数
            offset: 0, //当前页
            sort: 'auditTime', //排序列
            order: 'desc', //排序方式
            startTime: '', //开始时间
            endTime: '', //结束时间
            name: '', //提案名称
            type: '', //提案类型
            status: '' //提案状态
          }
        }
      },
      created () {
        this.getProposalList();
      },
      methods: {
        getProposalList () {
          this.typeRadio != 'all' ? (this.filterReq.type = this.typeRadio) : this.filterReq.type = '';
          this.statusRadio != 'all' ? (this.filterReq.status = this.statusRadio) : this.filterReq.status = '';
          doneList(this.filterReq).then(res => {
            this.tableData = res.data
          })
        },
        //改变页数
        pageChange (n,t) {
          t ? this.filterReq.offset = n-1  : this.filterReq.limit = n;
          this.filterReq.offset = this.filterReq.offset * this.filterReq.limit;
          this.getProposalList()
        },
        //过滤查询
        filterHandle () {
          //重置页码
          this.filterReq.offset = 0;
          this.filterReq.limit = 10;
          this.currentPageNum = 1;
          this.getProposalList();
        }
      }
    }
</script>
