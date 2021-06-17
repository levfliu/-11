<template>
    <div class="view">
        <empty-content v-if="viewId === 'list'" content="请新增或查看视图设计"></empty-content>
        <div v-if="viewId !== 'list' && editView">
            <el-tabs style="width:1000px;" v-model="activeName" type="border-card">
                <el-tab-pane label="基本设置" name="first">
                    <el-form style="width:835px;" :model="editView" label-width="180px">
                        <el-form-item label="名称">
                            <el-col :span="8">
                                <el-input :span="12" v-model="editView.view_name"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="变量">
                            <el-col :span="8">
                                <el-input :span="12" disabled v-model="variables"></el-input>
                            </el-col>
                            <el-button style="margin-left:32px" type="primary" @click="variablesSettingsShow=true">变量配置</el-button>
                        </el-form-item>
                        <el-form-item label="数据权限">
                            <el-col :span="8">
                                <el-select v-model="editView.data_auth_type" placeholder="请选择">
                                    <el-option label="自己的数据" value="1"></el-option>
                                    <el-option label="部门" value="2"></el-option>
                                    <el-option label="所有数据" value="3"></el-option>
                                    <el-option label="自定义" value="4"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="生成列表页">
                            <el-switch
                                v-model="editView.listPage"
                                active-color="#0454f2"
                                inactive-color="#999999">
                            </el-switch>
                            <el-button v-if="editView.listPage" type="primary" style="margin:0 0 0 500px;" @click="onRouterShow()">查看路由</el-button>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="在数据填报显示">
                            <el-switch
                                v-model="editView.is_show"
                                active-color="#0454f2"
                                inactive-color="#999999">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="分类名称">
                            <el-col :span="8">
                                <el-select v-model="editView.formViewColumnMappingList" placeholder="请选择">
                                    <el-option label="自己的数据" value="myself"></el-option>
                                    <el-option label="部门" value="department"></el-option>
                                    <el-option label="所有数据" value="all"></el-option>
                                    <el-option label="自定义" value="user-defined"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="显示名称">
                            <el-col :span="8">
                                <el-input v-model="editView.show_name"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div>
                        <span style="font-size:14px;color:#666;margin:0 0 0 110px;">填报权限</span>
                        <el-button type="primary" style="margin:0 0 0 10px;size:">配置</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="列表页" name="second">
                    <viewModeSelect :list="listMode" :choosed="editView.view_list_mode" @onClick="setListMode" />
                </el-tab-pane>
                <el-tab-pane label="详情页" name="third">详情页</el-tab-pane>
                <el-tab-pane label="新增页" name="fourth">新增页</el-tab-pane>
            </el-tabs>
            <div style="width:1000px;background:#fff;margin:24px 0;padding:12px 0 0 0" v-if="activeName=='second'">
                <el-tabs style="" v-model="listModeTab" :stretch="true">
                    <el-tab-pane label="基础设置" name="basicConfiguration">
                        <div style="padding:24px;">
                            <el-row>
                                按钮位置
                                <el-radio-group v-model="editView.button_layout_type" style="margin-left:20px">
                                    <el-radio-button label="1">居左</el-radio-button>
                                    <el-radio-button label="2">居右</el-radio-button>
                                </el-radio-group>
                                <span style="margin-left:300px;">序号</span>
                                <el-radio-group v-model="editView.order_number_display">
                                    <el-radio-button :label="true">显示</el-radio-button>
                                    <el-radio-button :label="false">不显示</el-radio-button>
                                </el-radio-group>                                
                            </el-row>
                            <br/>
                            <el-row>
                                补齐空行
                                <el-radio-group v-model="editView.filter_fill_line" style="margin-left:20px">
                                    <el-radio-button :label="true">开启</el-radio-button>
                                    <el-radio-button :label="false">关闭</el-radio-button>
                                </el-radio-group>                                
                                <el-tooltip class="item" effect="dark" content="" placement="top">
                                    <div slot="content">当每页行数大于一页的数据行数时，<br/>
                                    是否用空行补齐不足的行数。比如每<br/>
                                    页行数是10行，当前数据只有2行，开<br/>
                                    启补齐空行，系统会自动追加8行空<br/>
                                    行，不开启，则不追加空行。开启此<br/>
                                    功能可保证页面高度不会因为数据多<br/>
                                    少而改变。</div>
                                    <i class="el-icon-question" style="color:#aaa"></i>
                                </el-tooltip>
                            </el-row>
                            <br/>
                            <el-row>
                                页码样式
                                <el-switch
                                style="margin-left:20px"
                                v-model="editView.open_pagination"
                                active-color="#0454f2"
                                inactive-color="#ddd">
                                </el-switch>
                            </el-row>
                            <br/>
                            <el-row v-if="editView.open_pagination">                                
                                <el-radio-group :span="6" v-model="editView.page_style_type" style="margin-left:20px">
                                    <el-radio-button :label="1">居左</el-radio-button>
                                    <el-radio-button :label="2">居中</el-radio-button>
                                    <el-radio-button :label="3">居右</el-radio-button>
                                </el-radio-group> 
                                <el-checkbox-group :span="6" v-model="pageStyle" style="margin-left:300px;width:300px;display:inline" indeterminate>
                                    <el-checkbox label="13">记录总数</el-checkbox>
                                    <el-checkbox label="14">每页记录数</el-checkbox>
                                    <el-checkbox label="15">快速跳转</el-checkbox>
                                </el-checkbox-group>
                            </el-row>
                            <br/>
                            <!-- 功能设置 -->
                            <div class="form_functionality">
                                <div>功能设置</div>
                                <div style="width:100px;">
                                    <el-checkbox-group style="display:inline;width:600px;" v-model="form_functionality">
                                        <el-checkbox label="0">新增数据</el-checkbox>
                                        <el-checkbox class="top" label="2">删除数据</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div style="width:300px;margin-right:20px;" class="flex-col">
                                    <div class="flex-row">
                                        <span style="font-size:14px;color:#999;margin:2px 20px 0 0">按钮名称</span>
                                        <el-input v-model="editView.add_alias" size="small" placeholder=""></el-input>
                                    </div>
                                    <div class="flex-row">
                                        <span style="font-size:14px;color:#999;margin:31px 20px 0 0;">按钮名称</span>
                                        <el-input style="margin:26px 0" v-model="editView.delete_alias" size="small" placeholder=""></el-input>
                                        <div class="button" style="margin:26px 0 0 12px;" @click="onConditionShow('delete')">显示条件
                                            <img v-if="conditionList[1].condition_detail.length" src="./assets/images/btn_falg.png" alt="" style="position:absolute;top:0;right:0;">
                                        </div>
                                    </div>
                                </div>
                                <div style="width:100px;">                                    
                                    <el-checkbox-group style="display:inline;width:600px;" v-model="form_functionality">
                                        <el-checkbox label="1">编辑数据</el-checkbox>
                                        <el-checkbox class="top" label="7">查看详情</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div style="width:300px;margin-right:40px;" class="flex-col">
                                    <div class="flex-row">
                                        <span style="font-size:14px;color:#999;margin:2px 20px 0 0;">按钮名称</span>
                                        <el-input style="margin:0px 0" v-model="editView.edit_alias" size="small" placeholder=""></el-input>
                                        <div class="button" style="margin:0px 0 0 12px;" @click="onConditionShow('edit')">显示条件
                                            <img v-if="conditionList[0].condition_detail.length" src="./assets/images/btn_falg.png" alt="" style="position:absolute;top:0;right:0;">
                                        </div>
                                    </div>
                                    <div class="flex-row">
                                        <span style="font-size:14px;color:#999;margin:31px 20px 0 0;">按钮名称</span>
                                        <el-input style="margin:26px 0" v-model="editView.delete_alias" size="small" placeholder=""></el-input>
                                        <div class="button" style="margin:26px 0 0 12px;" @click="onConditionShow('detail')">显示条件
                                            <img v-if="conditionList[2].condition_detail.length" src="./assets/images/btn_falg.png" alt="" style="position:absolute;top:0;right:0;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div class="flex-row total_count">
                                <el-checkbox-group style="display:inline;width:100px;margin-left:84px" v-model="form_functionality">
                                        <el-checkbox class="top" label="unknown">显示总计</el-checkbox>
                                </el-checkbox-group>
                                <span v-if="form_functionality.indexOf('unknown')>-1">统计字段</span>
                                <el-input v-if="form_functionality.indexOf('unknown')>-1" style="margin:-6px 0 0 20px;" placeholder="请选择" size="small" />
                            </div>
                            <div class="form_other">
                                <el-checkbox-group style="display:inline;width:140px;margin-left:84px" v-model="form_functionality">
                                        <el-checkbox class="top" label="6">批量操作</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="form_other flex-row">
                                <el-checkbox-group style="display:inline;width:100px;margin-left:84px" v-model="form_functionality">
                                    <el-checkbox label="12">树型列表</el-checkbox>
                                </el-checkbox-group>
                                <span v-if="form_functionality.indexOf('12')>-1">父节点字段</span>
                                <el-select v-if="form_functionality.indexOf('12')>-1" v-model="editView.tree_parent_column" style="margin:-6px 0 0 20px;" placeholder="请选择" size="small">
                                    <el-option :label="'单行文本'" :value="'单行文本'"></el-option>
                                    <el-option :label="'多行文本'" :value="'多行文本'"></el-option>
                                    <el-option :label="'多选框'" :value="'多选框'"></el-option>
                                    <el-option :label="'创建人'" :value="'创建人'"></el-option>
                                    <el-option :label="'创建时间'" :value="'创建时间'"></el-option>
                                    <el-option :label="'最后修改人'" :value="'最后修改人'"></el-option>
                                    <el-option :label="'最后修改时间'" :value="'最后修改时间'"></el-option>
                                    <el-option :label="'创建人IP地址'" :value="'创建人IP地址'"></el-option>
                                    <el-option :label="'最后修改人IP地址'" :value="'最后修改人IP地址'"></el-option>
                                    <el-option :label="'部门'" :value="'部门'"></el-option>
                                    <el-option :label="'流程名称'" :value="'流程名称'"></el-option>
                                    <el-option :label="'流程实例名称'" :value="'流程实例名称'"></el-option>
                                    <el-option :label="'业务状态'" :value="'业务状态'"></el-option>
                                    <el-option :label="'流程状态'" :value="'流程状态'"></el-option>
                                    <el-option :label="'经办人'" :value="'经办人'"></el-option>
                                    <el-option :label="'流程实例ID'" :value="'流程实例ID'"></el-option>
                                </el-select>
                            </div>
                            <br/>
                            <br/>
                            <!-- 导入导出 -->
                            <div class="flex-row">
                                <div>导入导出</div>
                                <div style="width:100px; margin-left:20px;">
                                    <el-checkbox-group style="display:inline;width:600px;" v-model="form_functionality">
                                        <el-checkbox label="export_encrypt_type">导出数据</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div style="margin-left:40px;">
                                    <span style="font-size:14px;margin:0 10px 0 0;color:#999">文件名</span>
                                    <el-select v-model="editView.export_file_name_type" size="small" style="margin-top:-8px;">
                                        <el-option value="0" label="默认名称"></el-option>
                                        <el-option value="1" label="固定值+年月日"></el-option>
                                        <el-option value="2" label="固定值+年月日时分秒"></el-option>
                                    </el-select>
                                </div>
                                <div class="flex-row export" style="margin:-6px 0 0 30px;width:374px;align-items:center">
                                    <div style="font-size:14px;margin:0 0px 0 0;width:70px;color:#999">固定值</div>
                                    <el-input size="small" v-model="editView.export_file_name_fixed_value"></el-input>
                                    <div class="button" style="margin:0px 0 0 94px;">设置导出字段</div>
                                </div>
                            </div>
                            <br/>
                            <div class="flex-row" style="margin:0 0 0 224px;">
                                <div style="font-size:14px;color:#999;margin:-4px 16px 0 0;">导出为</div>
                                <el-select v-model="editView.export_file_type" multiple size="small" style="margin-top:-8px;">
                                    <el-option :value="1" :label="'excel'"></el-option>
                                    <el-option :value="2" :label="'pdf'"></el-option>
                                </el-select>
                            </div>
                            <div class="form_other">
                                <el-checkbox-group style="display:inline;width:140px;margin-left:84px" v-model="editView.is_export_asset_property">
                                        <el-checkbox class="top" label="1">是否导出字段的资产名称</el-checkbox>
                                </el-checkbox-group>
                                <span style="color:#999;">（若不勾选则导出的文件不能直接导入）</span>
                            </div>
                            <div class="form_other">
                                <el-checkbox-group style="display:inline;width:140px;margin-left:84px" v-model="editView.export_encrypt_type">
                                        <el-checkbox class="top" label="6">是否加密导出</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <br/>
                            <br/>
                            <div class="flex-row">
                                <div style="width:100px; margin-left:82px;">
                                    <el-checkbox-group style="display:inline;width:600px;" v-model="form_functionality">
                                        <el-checkbox label="15">导入数据</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div style="margin-left:40px;">
                                    <span style="font-size:14px;margin:0 10px 0 0;color:#999">重复处理数据方式</span>
                                    <el-select v-model="editView.export_file_name_type" size="small" style="margin-top:-8px;">
                                        <el-option value="1" label="报错"></el-option>
                                        <el-option value="2" label="更新数据"></el-option>
                                    </el-select>
                                </div>
                                <div class="flex-row export" style="margin:-6px 0 0 30px;width:274px;align-items:center">
                                    <div class="button" style="margin:0px 0 0 94px;">设置导入字段</div>
                                </div>
                            </div>
                            <!-- <div class="form_other">
                                <el-checkbox-group style="display:inline;width:140px;margin-left:84px" v-model="editView.export_encrypt_type">
                                        <el-checkbox class="top" label="6">导入数据</el-checkbox>
                                </el-checkbox-group>                                
                                <el-select v-model="editView.is_export_asset_property" multiple size="small" style="margin-top:-8px;">
                                    <el-option :value="1" :label="'excel'"></el-option>
                                    <el-option :value="2" :label="'pdf'"></el-option>
                                </el-select>
                            </div> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="列表字段" name="listField">
                        <listField :show_list="editView.fromViewColumns"></listField>
                    </el-tab-pane>
                    <el-tab-pane label="列表排序" name="listSequences"></el-tab-pane>
                    <el-tab-pane label="查询字段" name="searchField"></el-tab-pane>
                    <el-tab-pane label="按钮配置" name="buttonConfiguration">
                        <div class="flex-row" style="padding:20px 60px;">
                            按钮配置 <el-button @click="onButtonConfigShow" type="primary" size="small" style="margin:-4px 30px">新 &nbsp;增</el-button>
                        </div>
                        <div style="margin:0 0 100px 60px;width:902px;">
                            <el-table :data="buttonConfiguration" border>
                                <el-table-column label="标题" width="180">
                                    <template slot-scope="scope">{{showTitle(scope.row)}}</template>
                                </el-table-column>
                                <el-table-column prop="date" label="批量操作" width="180">
                                    不支持
                                </el-table-column>
                                <el-table-column prop="response_mode" label="响应方式" width="180">
                                    <template slot-scope="scope">{{showResponseMode(scope.row.response_mode)}}</template>
                                </el-table-column>
                                <el-table-column prop="execution_opportunity" label="执行时机" width="180">
                                    <template slot-scope="scope">{{scope.row.response_mode==1?"立即":"确认"}}</template>
                                </el-table-column>
                                <el-table-column prop="date" label="操作" width="180">
                                    <template slot-scope="scope">
                                        <span style="color:#5182e4;cursor:pointer;" @click="deleteButton(scope.row)">删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="显示设置" name="displayConfiguration"></el-tab-pane>
                    <el-tab-pane label="关联列表" name="relationList"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="view-button">
                <el-button type="primary" @click="onSubmit">保存</el-button> 
                <el-button @click="onCancel">取消</el-button>
            </div>
            <div style="height:100px;"></div>
        </div>        
        <!-- 变量配置 -->
        <el-dialog width="850px" title="变量配置"  :visible.sync="variablesSettingsShow">
            <el-row :gutter="20">
                <el-col :span="7">变量名称</el-col>
                <el-col :span="7">变量类型</el-col>
                <el-col :span="7">默认值</el-col>
                <el-col :span="3"></el-col>
            </el-row>
            <el-row :gutter="20" v-for="(i,id) in  editView.variables" :key="id" style="margin-top:12px;" type="flex" align="middle">
                <el-col :span="7">
                    <el-input size="small" v-model="i.variable_name" clearable></el-input>
                </el-col>
                <el-col :span="7">
                    <el-select size="small" v-model="i.variable_data_type" :disabled="!Boolean(i.variable_name)">
                        <el-option label="文本" value="0"></el-option>
                        <el-option label="日期" value="6"></el-option>
                        <el-option label="数字" value="8"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-input 
                    v-model="i.variable_str_value" 
                    size="small" 
                    v-if="i.variable_data_type==0" 
                    :disabled="!Boolean(i.variable_name)" 
                    clearable></el-input>
                    <el-input 
                    v-model="i.variable_str_value" 
                    size="small" 
                    v-if="i.variable_data_type==8" 
                    :disabled="!Boolean(i.variable_name)" 
                    clearable></el-input>
                    <el-date-picker   
                    :disabled="!Boolean(i.variable_name)"
                    size="small"
                    v-model="i.variable_str_value"
                    v-if="i.variable_data_type==6" 
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="3">
                    <i @click="removeVariableItem(i.id)" class="el-icon-remove" style="color:red;font-size:28px"></i>
                </el-col>
            </el-row>
            <el-row style="margin-top:12px;">
                <el-button size="small" @click="addVariableItem" type="primary">+添加</el-button>
            </el-row>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="variablesSettingsShow = false">取 消</el-button>
                <el-button type="primary" @click="variablesSettingsShow = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 显示设置 -->
        <el-dialog width="850px" :visible.sync="conditionShow" :title="conditionShowTitle">
            <div class="flex-row aling-center">
                <span style="margin:-5px 20px 4px 0;font-size:16px;">条件设置</span>
                <el-radio v-model="condition" :label="1">同时满足</el-radio>
                <el-radio v-model="condition" :label="2">单个满足</el-radio>
            </div>
            <div class="condition-list-box">
                <div class="oneline" v-for="(i,id) in conditionListNow" :key="id">
                    <el-select v-model="i.column" size="small">
                        <el-option :label="i.label" :value="i.label" v-for="(i,id) in $store.getters.fieldList" :key="id"></el-option>
                    </el-select>
                    <el-select v-model="i.type" size="small">
                        <el-option label="等于" :value="4"></el-option>
                        <el-option label="不等于" :value="5"></el-option>
                    </el-select>
                    <el-select v-model="i.value_type" size="small" @change="i.compareObj='请输入'">
                        <el-option label="固定值" :value="0"></el-option>
                        <el-option label="变量" :value="1"></el-option>
                    </el-select>
                    <el-input v-if="i.value_type=='0'" v-model="i.compareObj" size="small"></el-input>
                    <el-select v-else v-model="i.compareObj" size="small">
                        <el-option-group label="自定义变量">
                            <el-option label="aaaaccc" value="0930c736-261b-4c49-a401-fe0fac5550a6"></el-option>
                        </el-option-group>
                        <el-option-group label="系统变量">
                            <el-option label="当前时间" value="systemNowTime"></el-option>
                        </el-option-group>                        
                    </el-select>
                    <i @click="removeConditionItem(id)" class="el-icon-remove" style="color:red;font-size:28px;position:relative;top:6px;"></i>
                </div>
                <el-button size="small" @click="addConditionItem" type="primary">+添加</el-button>
            </div>            
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="conditionShow = false">取 消</el-button>
                <el-button type="primary" @click="conditionShow = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 按钮配置 -->
        <el-dialog width="850px" :visible.sync="buttonConfigShow" title="按钮编辑">
            <div class="flex-row align-center button-config" v-if="buttonConfigShow">
                按钮类型
                <el-select v-model="buttonConfig.button_type" size="small">
                    <el-option label="行内按钮" value="2"></el-option>
                    <el-option label="全局按钮" value="1"></el-option>
                    <el-option label="组件按钮" value="3"></el-option>
                </el-select>
                <span style="margin-left:40px"><i>*</i>标题</span>
                <el-input v-if="buttonConfig.button_type!=3" v-model="buttonConfig.title" size="small"></el-input>           
                <el-select v-if="buttonConfig.button_type==3" v-model="buttonConfig.title" style="margin:-6px 0 0 20px;" placeholder="请选择" size="small">
                    <el-option :label="'单行文本'" :value="'单行文本'"></el-option>
                    <el-option :label="'多行文本'" :value="'多行文本'"></el-option>
                    <el-option :label="'多选框'" :value="'多选框'"></el-option>
                    <el-option :label="'创建人'" :value="'创建人'"></el-option>
                    <el-option :label="'创建时间'" :value="'创建时间'"></el-option>
                    <el-option :label="'最后修改人'" :value="'最后修改人'"></el-option>
                    <el-option :label="'最后修改时间'" :value="'最后修改时间'"></el-option>
                    <el-option :label="'创建人IP地址'" :value="'创建人IP地址'"></el-option>
                    <el-option :label="'最后修改人IP地址'" :value="'最后修改人IP地址'"></el-option>
                    <el-option :label="'部门'" :value="'部门'"></el-option>
                    <el-option :label="'流程名称'" :value="'流程名称'"></el-option>
                    <el-option :label="'流程实例名称'" :value="'流程实例名称'"></el-option>
                    <el-option :label="'业务状态'" :value="'业务状态'"></el-option>
                    <el-option :label="'流程状态'" :value="'流程状态'"></el-option>
                    <el-option :label="'经办人'" :value="'经办人'"></el-option>
                    <el-option :label="'流程实例ID'" :value="'流程实例ID'"></el-option>
                </el-select>
            </div>
            <br/>
            <br/>
            <el-tabs type="border-card">
                <el-tab-pane label="相应方式" class="card-response-mode">
                    <el-select v-model="buttonConfig.response_mode" size="small" class="head">
                        <el-option label="弹窗" value="1"></el-option>
                        <el-option label="更新数据" value="2"></el-option>
                        <el-option label="新页签" value="4"></el-option>
                        <el-option label="下载" value="10"></el-option>
                    </el-select>
                    <keep-alive>
                        <component v-bind:is="responseModeComponentList[buttonConfig.response_mode]" :responseDetail="buttonConfig"></component>
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="操作选项">
                    <br>
                    批量操作
                    <el-radio disabled label="支持"></el-radio>
                    <el-radio disabled label="不支持"></el-radio>
                    <br><br><br><br>
                    执行时机
                    <el-radio-group v-model="buttonConfig.execution_opportunity" size="mini">
                        <el-radio label="1">立即</el-radio>
                        <el-radio label="2">确认后</el-radio>
                    </el-radio-group>
                    <br><br><br><br>
                </el-tab-pane>
                <el-tab-pane label="显示条件" v-if="buttonConfig.button_type!=1">
                    <br>
                    是否开启
                    <el-switch v-model="buttonConfig.button_display_flag" active-color="#5182e4"></el-switch>
                    <div style="display:inline-block;margin:0 0 0 30px;" v-if="buttonConfig.button_display_flag==true">
                        条件设置 &nbsp; &nbsp; 
                        <el-radio v-model="buttonConfig.is_batch" :label="true">同时满足</el-radio>
                        <el-radio v-model="buttonConfig.is_batch" :label="false">单个满足</el-radio>
                    </div>
                    <!-- {"column":"多行文本","datatype":0,"type":5,"value_type":1,"compareObj":"66745d6b-9159-453b-b79c-c6c7165506b0","satisfy_type":0} -->
                    <div class="display_condition">
                        <div class="one_line" v-for="(i,id) in buttonConfig.display_condition" :key="id">
                            <el-select v-model="i.column" size="small" @change="i.type=i.value_type='请选择'">
                                <el-option label="单行文本" value="单行文本"></el-option>
                                <el-option label="多行文本" value="多行文本"></el-option>
                            </el-select>
                            <el-select v-model="i.type" size="small" @change="i.value_type='请选择'">
                                <el-option label="等于" value="4"></el-option>
                                <el-option label="不等于" value="5"></el-option>
                            </el-select>
                            <el-select v-model="i.value_type" size="small">
                                <el-option label="固定值" value="0"></el-option>
                                <el-option label="变量" value="1"></el-option>
                            </el-select>
                            <div class="compareObj">
                                <el-input v-if="i.value_type=='0'" v-model="i.compareObj" size="small"></el-input>
                                <el-select v-else-if="i.value_type=='1'" v-model="i.compareObj" size="small">
                                    <el-option-group label="系统变量">
                                        <el-option label="当前时间" value="当前时间"></el-option>
                                        <el-option label="当前用户ID" value="当前用户ID"></el-option>
                                    </el-option-group>
                                </el-select>
                                <div v-else style="display:inline-block;width:210px;"></div>
                            </div>
                            <i @click="removeDisplayCondition(id)" class="el-icon-remove" style="color:red;font-size:28px;transform:translateY(7px);"></i>
                        </div>
                        <br>
                        <el-button @click="addDisplayCondition" type="primary" size="small">+ 添加</el-button>
                    </div> 
                </el-tab-pane>
            </el-tabs>
                   
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="buttonConfigShow = false">取 消</el-button>
                <el-button type="primary" @click="buttonConfigShow = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog  width="850px" :visible.sync="routerShow" title="查看路由" class="routerShow">
            <div>
                     列表页<el-input disabled v-model="listPage">                         
                        <el-button slot="append" v-clipboard:copy="listPage" v-clipboard:success="copy" >复制</el-button>
                     </el-input></div><br>
            <div>
                     新增页<el-input disabled v-model="addPage">                      
                        <el-button slot="append" v-clipboard:copy="addPage" v-clipboard:success="copy" >复制</el-button>
                     </el-input></div><br>
            <div>
                     详情页<el-input disabled v-model="detailPage">                         
                        <el-button slot="append" v-clipboard:copy="detailPage" v-clipboard:success="copy" >复制</el-button>
                     </el-input></div><br>
            <div>
                     编辑页<el-input disabled v-model="editPage">                         
                        <el-button slot="append" v-clipboard:copy="editPage" v-clipboard:success="copy" >复制</el-button>
                     </el-input></div>
            <template slot="footer">
                <span class="dialog-footer">
                <el-button type="primary" @click="routerShow = false">关 闭</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import emptyContent from '../system/emptyContent'
import response_mode_1_dialog from "./components/form-view-buttons/response_mode_1_dialog"
import response_mode_2_update_data from "./components/form-view-buttons/response_mode_2_update_data"
import listField from "./components/list_field"

export default {
    data () {
        const resopnse_mode_0_zero=_=>(<div>暂无数据</div>)
        return {
            conditionShow:false,
            conditionShowTitle:"",
            condition:1,
            responseModeComponentList:{
                "0":resopnse_mode_0_zero,
                "1":response_mode_1_dialog,
                "2":response_mode_2_update_data
            },
            conditionList:[
            {
                condition_detail:
                [{"column":"多行文本","datatype":0,"type":4,"value_type":0,"compareObj":"111","satisfy_type":1}],
                condition_type: 2,
                id: "10e585e832d2474a91c239978980c031",
                view_id: "0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f",
            },
            {
                condition_detail:
                [{"column":"单行文本","datatype":0,"type":5,"value_type":0,"compareObj":"士大夫敢死队风格士大夫","satisfy_type":0},{"column":"多行文本","datatype":0,"type":4,"value_type":0,"compareObj":"qqqqqqqqq","satisfy_type":0},{"column":"多选框","datatype":0,"type":126,"value_type":0,"compareObj":"1,2","satisfy_type":0,"formComponentId":"fc6d8f68267190e7228346e6f94f355f"}],
                condition_type: 3,
                id: "83bf9f2da464434d97705e9f40554640",
                view_id: "0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f",
            },
            {
                condition_detail:
                [{"column":"flow_instance_id","datatype":0,"type":4,"value_type":1,"compareObj":"0930c736-261b-4c49-a401-fe0fac5550a6","satisfy_type":1},{"column":"多行文本","datatype":0,"type":5,"value_type":0,"compareObj":"55555","satisfy_type":1}],
                condition_type: 4,
                id: "bb96fd3487fc44709810bbcd11d12b6a",
                view_id: "0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f",
            },
            ],
            conditionListNow:[],
            activeName: 'first',
            listModeTab:"basicConfiguration",
            dataPermission:[{
                value:1,
                label:"自己的数据"
            },{}],
            variablesSettingsShow:false,
            listMode:[{text:"表格",disabled:false},{text:"日历",disabled:true},{text:"时间轴",disabled:true},
            {text:"资讯",disabled:true},{text:"目录",disabled:true},{text:"卡片",disabled:true},
            {text:"看板",disabled:true},{text:"画布",disabled:true}],
            detailMode:["表格","文章","简历"],
            form_functionality:[-1,0,999,1001,3333],
            pageStyle:[],
            buttonConfigShow:false,
            buttonConfiguration:
            [{"button_display_flag":true,"button_param":"[{\"name\":\"data_id\",\"type\":\"fixed_value\",\"value\":\"data_id\"},{\"name\":\"form_id\",\"type\":\"fixed_value\",\"value\":\"form_id\"}]","button_type":"2","display_condition":"[{\"column\":\"多行文本\",\"datatype\":0,\"type\":5,\"value_type\":1,\"compareObj\":\"66745d6b-9159-453b-b79c-c6c7165506b0\",\"satisfy_type\":0}]","execution_opportunity":"1","file_path":"[]","id":"68458d71-a91a-439e-ad07-6382200d73bb","is_batch":false,"response_detail":"{\"width\":444,\"height\":555}","response_mode":"1","sort":0,"title":"弍","url":"也一样","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"button_display_flag":false,"button_type":"3","display_condition":"[]","execution_opportunity":"1","file_path":"[]","id":"b9102bde-c2b9-4a53-bbab-c6448f21ed45","is_batch":false,"response_detail":"{\"ids\":[\"369c1be146a42e180e3cb0ef9fe1ef81\"],\"query\":[{\"col_value\":[],\"col_name\":\"369c1be146a42e180e3cb0ef9fe1ef81\",\"asset_id\":\"e8cd852b5640416eba558bc9726561d3\",\"col_datatype\":0}],\"value\":{\"view_name\":\"江苏百展客_业务流\",\"variates_length\":5,\"data_auth_type\":\"0\",\"catalog_id\":\"d37bdf86-71f4-4bbe-b54d-c9d4ed368a09\",\"show_name\":\"江苏百展客\",\"form_functionality\":[\"12\",\"3\",\"4\",\"8\"],\"button_layout_type\":2,\"button_show_type\":1,\"order_number_display\":true,\"filter_fill_line\":true,\"page_style_type\":2,\"form_pagination\":[\"13\",\"14\",\"15\"],\"tree_parent_column\":\"单行文本,aea00dac5303bd57a3ed03503f867f7b\",\"export_file_type\":[\"1\",\"2\"],\"button_type\":\"3\",\"execution_opportunity\":1,\"response_mode\":\"2\",\"is_batch\":0,\"open_pagination\":true,\"form_width\":200,\"title\":\"369c1be146a42e180e3cb0ef9fe1ef81\"}}","response_mode":"2","sort":1,"title":"369c1be146a42e180e3cb0ef9fe1ef81","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"button_display_flag":false,"button_param":"[{\"name\":\"会很尴尬\",\"value\":\"af57d1a4-6963-4db2-aeee-0686b3ced25d\",\"type\":\"variable\"}]","button_type":"3","display_condition":"[]","execution_confirm_type":1,"execution_opportunity":"2","file_path":"[]","id":"ed4bafa4-a113-4a36-8eab-7c2c6e6c7623","is_batch":false,"preview_result":"[{\"type\":2,\"value\":{\"componentId\":\"369c1be146a42e180e3cb0ef9fe1ef81\",\"componentType\":\"textarea\",\"componentTitle\":\"多行文本\",\"isSelect\":false}}]","response_mode":"4","sort":2,"title":"8970573e78e9a6050c61efbdaa682bcf","url":"哦哦哦ii","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"button_display_flag":false,"button_type":"2","display_condition":"[]","execution_opportunity":"1","file_path":"[]","id":"957822af-3cc3-4bc0-bb66-811edaef5ec4","is_batch":false,"response_detail":"{\"ids\":[\"369c1be146a42e180e3cb0ef9fe1ef81\"],\"query\":[{\"col_value\":\"8888\",\"col_name\":\"369c1be146a42e180e3cb0ef9fe1ef81\",\"asset_id\":\"e8cd852b5640416eba558bc9726561d3\",\"col_datatype\":0}],\"value\":{\"view_name\":\"江苏百展客_业务流\",\"variates_length\":5,\"data_auth_type\":\"0\",\"catalog_id\":\"d37bdf86-71f4-4bbe-b54d-c9d4ed368a09\",\"show_name\":\"江苏百展客\",\"form_functionality\":[\"12\",\"3\",\"4\",\"8\"],\"button_layout_type\":2,\"button_show_type\":1,\"order_number_display\":true,\"filter_fill_line\":true,\"page_style_type\":2,\"form_pagination\":[\"13\",\"14\",\"15\"],\"tree_parent_column\":\"单行文本,aea00dac5303bd57a3ed03503f867f7b\",\"export_file_type\":[\"1\",\"2\"],\"button_type\":\"2\",\"execution_opportunity\":1,\"title\":\"弍\",\"response_mode\":\"2\",\"is_batch\":0,\"多行文本\":\"8888\",\"open_pagination\":true,\"form_width\":200}}","response_mode":"2","sort":3,"title":"弍","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"button_display_flag":false,"button_param":"[]","button_type":"1","display_condition":"[]","execution_opportunity":"1","file_path":"[]","id":"f1ada93d-de8e-4ec9-acb9-d340b2177aef","is_batch":false,"response_mode":"10","sort":4,"title":"quanjuanni","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],
            buttonConfig:{},
            display_condition:{}    ,
            routerShow:false        
        }
    },
    components: {
        'empty-content': emptyContent,
        'viewModeSelect':_=>import('./components/view-mode-select.vue'),
        listField
    },
    computed: {
        viewId () {
            return this.$store.getters.viewId
        },
        editView () {
            return this.$store.getters.editView
        },
        variables(){
            return "已配置"+this.editView.variables.length+"个变量"
        },
        addPage(){
            return window.location.host+"/form/"+this.$route.query.formId
        },
        listPage(){
            return window.location.host
            +"/viewShow?objectId="
            +this.$route.query.formId
            +"&viewId="
            +this.$store.getters.viewId
            +"&formName="
            +this.$route.query.formName
        },
        detailPage(){
            return window.location.host
            +"/form/"+this.$route.query.formId
            +"&type=detail&recordId="
            +"${recordId}"
        },
        editPage(){
            return window.location.host
            +"/form/"+this.$route.query.formId
            +"&type=update&recordId="
            +"${recordId}"
        }
    },
    watch:{
        form_functionality(_new,old){
            this.editView.form_functionality=_new.join(',')
        },
        pageStyle(_new,old){
            this.editView.form_pagination=_new.join(",")
        }
    },
    methods: {
        copy(i){            
          this.$message({
            type: "info",
            message: "已复制",
          });
        },
        onRouterShow(){
            console.log(123121);
            this.routerShow=true;
        },
        onButtonConfigShow(i){
            this.buttonConfig={
                button_display_flag: true,
                button_param:
                '[{"name":"data_id","type":"fixed_value","value":"data_id"},{"name":"form_id","type":"fixed_value","value":"form_id"}]',
                button_type: "2",
                display_condition:
                [{"column":"多行文本","datatype":0,"type":5,"value_type":1,"compareObj":"66745d6b-9159-453b-b79c-c6c7165506b0","satisfy_type":0}],
                execution_opportunity: "1",
                file_path: "[]",
                id: "68458d71-a91a-439e-ad07-6382200d73bb",
                is_batch: false,
                response_detail: '{"width":444,"height":555}',
                response_mode: "1",
                sort: 0,
                title: "弍",
                url: "也一样",
                view_id: "0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f",
            }
            
            this.buttonConfigShow=true
        },
        addDisplayCondition(){
            this.buttonConfig.display_condition.push(
                {"column":"请选择组件","datatype":0,"type":"请选择","value_type":"变量类型","compareObj":"","satisfy_type":0}
            )
        },
        removeDisplayCondition(i){
            this.buttonConfig.display_condition.splice(i,1);
        },
        showTitle(i){
            if(i.button_type==1||i.button_type==2){
                return i.title
            }
            else return "行内按钮"
        },
        deleteButton(i){
            console.log(i);
            this.buttonConfiguration=this.buttonConfiguration.filter(j=>j.id!=i.id)
        },
        showResponseMode(i){
            switch(i){
                case "1":
                case 1:
                    return "弹窗"
                case "2":
                case 2:
                    return "更新数据"
                case "4":
                case 4:
                    return "新页签"
                case "10":
                case 10:
                    return "下载"
                default:
                    return i
            }
        },
        onConditionShow(i){
            if(i=="delete"){
                this.conditionShowTitle="删除数据-显示设置"
                this.conditionListNow=this.conditionList[1].condition_detail
            }
            if(i=="edit"){
                this.conditionShowTitle="编辑数据-显示设置"
                this.conditionListNow=this.conditionList[0].condition_detail
            }
            if(i=="detail"){
                this.conditionShowTitle="查看详情-显示设置"
                this.conditionListNow=this.conditionList[2].condition_detail
            }
            this.conditionShow=true
        },
        setListMode(i){
            this.$nextTick(_=>{
                this.editView.view_list_mode=i
            })                
        },
        processID(){
            const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return uuid;
        },
        onCancel () {
            this.$router.push({
                name: 'service',
                query: {
                    catalog: this.$store.getters.serviceCatalog,
                    type: this.$store.getters.serviceType
                }
            })
        },
        onSubmit () {
            this.$store.dispatch('updateView')
        },
        removeVariableItem(id){
            this.editView.variables=this.editView.variables.filter(i=>i.id!=id)
        },
        removeConditionItem(id){
            this.conditionListNow.splice(id,1)
        },
        addConditionItem(){
            this.conditionListNow.push({"column":"单行文本","datatype":0,"type":4,"value_type":0,"compareObj":"","satisfy_type":0})
        },
        addVariableItem(){
            this.editView.variables.push({   
                id:this.processID(),             
                "variable_name": "",
                "variable_data_type": 0,
                "variable_str_value": ""
            })
        },
        compare(){
            // var old=
            // {"message":"查询成功","result":{"add_alias":"新增333","appendList":[],"button_layout_type":2,"button_show_type":1,"cal_condition":"{}","calendar_content":"{\"content\":\"\",\"values\":[]}","calendar_content_config":"[1]","canvasList":[],"card_group_switch":false,"catalog_id":"d37bdf86-71f4-4bbe-b54d-c9d4ed368a09","conditionList":[],"correlation_can_search":false,"correlation_search_fields_data_type":"0","create_member":"637806db-ab32-caee-c7b9-0519cd87e436","create_time":1618889742000,"data_auth_type":"0","del_flag":0,"delete_alias":"删除333","detail_basic_access_log_switch":false,"detail_share_qrcode":true,"edit_alias":"编辑333","export_encrypt_type":"1","export_file_name_fixed_value":"13211","export_file_name_type":0,"export_file_type":"[\"1\"]","filter_combine_component":false,"filter_fill_line":true,"filter_location":"top","formViewAuths":[{"auth_type":"3","auth_value":"3b0be68e912b46e1b2f5a9aa2357706b","auth_value_cn":"12","id":"d9337cdc-791d-46ed-909a-bd5374b3192e","owner_companyid":"3b0be68e912b46e1b2f5a9aa2357706b","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],"formViewButtons":[],"formViewConfigPlus":{"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},"formViewDetailButtons":[],"form_functionality":"12,3,4,8,export_encrypt_type","form_id":"245190cf-92e1-46c0-9318-72b8434331e1","form_pagination":"13,14,15","form_width":"200","fromViewColumns":[{"column_id":"e0f24061b0beb3092d869473ec1fe1df","column_type":2,"filter_combine_component":false,"id":"0e38be38-0324-41d4-b897-71505fd4bf1f","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"fc6d8f68267190e7228346e6f94f355f","column_type":2,"filter_combine_component":false,"id":"288ab650-ab7f-4bac-91e8-f5b7ebe8542d","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"aea00dac5303bd57a3ed03503f867f7b","column_type":2,"filter_combine_component":false,"id":"3a74b4eb-e10d-4c63-9f04-a931b29b63ae","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"8970573e78e9a6050c61efbdaa682bcf","column_type":2,"filter_combine_component":false,"id":"487feaa5-c485-4b05-a047-9a7b85687594","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"589c0813c41e863bc82ff4d0a9c9878d","column_type":2,"filter_combine_component":false,"id":"4dc1f869-ea0f-425f-813c-685ab4ab4609","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"3cd89e5496991c5a5f191321e1450229","column_type":2,"filter_combine_component":false,"id":"8af5b7aa-e41d-4150-81a8-527d6adf19fd","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"19a58cf04ae34050c3da0ec2d0ce4582","column_type":2,"filter_combine_component":false,"id":"a12a66de-f4ec-4323-a40e-0e3336ec1000","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"6ef5ed7a892ff6165fa5da7396559bd6","column_type":2,"filter_combine_component":false,"id":"cc6307ac-03bb-4886-92b0-162e4d36ca21","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"e5e2ac7000677b9ace23f4af6291644b","column_type":2,"filter_combine_component":false,"id":"ce1fe8eb-c730-402c-add1-37b73c32d5a3","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"369c1be146a42e180e3cb0ef9fe1ef81","column_type":2,"filter_combine_component":false,"id":"d696f60d-7eaa-48d7-8a13-8696cde76d9a","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"dd78e825e299f3902a0bcdb5d2666515","column_type":2,"filter_combine_component":false,"id":"d80bcd4d-9456-4e36-915c-5284fab9d262","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],"id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f","is_export_asset_property":true,"is_export_table_id":false,"is_show":true,"is_show_page":true,"last_modifier":"637806db-ab32-caee-c7b9-0519cd87e436","last_modify_time":1620956561000,"max_write_times":0,"modeColumnList":[],"open_pagination":true,"order_number_display":true,"orders":[],"overview_data":"[]","page_style_type":2,"query_type":0,"show_name":"江苏百展客","timeline_content":"{\"content\":\"\",\"values\":[]}","tree_parent_column":"单行文本,aea00dac5303bd57a3ed03503f867f7b","update_unique":1,"variables":[{"id":"0930c736-261b-4c49-a401-fe0fac5550a6","variable_data_type":8,"variable_name":"fff","variable_num_value":5.0,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"66745d6b-9159-453b-b79c-c6c7165506b0","variable_data_type":6,"variable_date_value":1619452800000,"variable_name":"eee","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"9bd2c5cb-5a11-4a7c-a537-583551c73c92","variable_data_type":0,"variable_name":"ddd","variable_str_value":"55","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"a58a4e58-e4bf-49e2-8c4b-29807b4c5126","variable_data_type":0,"variable_name":"444","variable_str_value":"666","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"af57d1a4-6963-4db2-aeee-0686b3ced25d","variable_data_type":8,"variable_name":"555","variable_num_value":777.0,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],"view_alias":"详情333","view_detail_mode":"0","view_list_mode":"1","view_name":"江苏百展客_业务流"},"status":200}
            // var _new=
            // {"message":"查询成功","result":{"add_alias":"新增333","appendList":[],"button_layout_type":2,"button_show_type":1,"cal_condition":"{}","calendar_content":"{\"content\":\"\",\"values\":[]}","calendar_content_config":"[1]","canvasList":[],"card_group_switch":false,"catalog_id":"d37bdf86-71f4-4bbe-b54d-c9d4ed368a09","conditionList":[],"correlation_can_search":false,"correlation_search_fields_data_type":"0","create_member":"637806db-ab32-caee-c7b9-0519cd87e436","create_time":1618889742000,"data_auth_type":"0","del_flag":0,"delete_alias":"删除333","detail_basic_access_log_switch":false,"detail_share_qrcode":true,"edit_alias":"编辑333","export_encrypt_type":"0","export_file_name_fixed_value":"13211","export_file_name_type":0,"export_file_type":"[\"1\",\"2\"]","filter_combine_component":false,"filter_fill_line":true,"filter_location":"top","formViewAuths":[{"auth_type":"3","auth_value":"3b0be68e912b46e1b2f5a9aa2357706b","auth_value_cn":"12","id":"ab4f967f-273d-4c68-ba84-426cb6beaf15","owner_companyid":"3b0be68e912b46e1b2f5a9aa2357706b","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],"formViewButtons":[],"formViewConfigPlus":{"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},"formViewDetailButtons":[],"form_functionality":"12,3,4,8","form_id":"245190cf-92e1-46c0-9318-72b8434331e1","form_pagination":"13,14,15","form_width":"200","fromViewColumns":[{"column_id":"aea00dac5303bd57a3ed03503f867f7b","column_type":2,"filter_combine_component":false,"id":"3b195401-6dc1-40f2-974f-a8300e9e784c","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"fc6d8f68267190e7228346e6f94f355f","column_type":2,"filter_combine_component":false,"id":"3f7ee477-6256-45ce-97af-2d2822afb4f3","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"e0f24061b0beb3092d869473ec1fe1df","column_type":2,"filter_combine_component":false,"id":"3fd6bb34-d9f9-4fdd-bdf6-af4797396c32","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"19a58cf04ae34050c3da0ec2d0ce4582","column_type":2,"filter_combine_component":false,"id":"5ad64f97-9c2f-4855-8832-f15c8eca340f","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"3cd89e5496991c5a5f191321e1450229","column_type":2,"filter_combine_component":false,"id":"5d780907-cde2-40a0-9654-5f120e3f524a","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"369c1be146a42e180e3cb0ef9fe1ef81","column_type":2,"filter_combine_component":false,"id":"85977915-d8cc-48c6-83a3-3b4d1f19e1df","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"dd78e825e299f3902a0bcdb5d2666515","column_type":2,"filter_combine_component":false,"id":"8c8c3509-4631-46b7-8054-88d89c0d2520","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"8970573e78e9a6050c61efbdaa682bcf","column_type":2,"filter_combine_component":false,"id":"8d26f01c-f863-4d7b-bf0a-c47134c72af1","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"589c0813c41e863bc82ff4d0a9c9878d","column_type":2,"filter_combine_component":false,"id":"91fe994f-fe4b-48e1-9df4-b4d4d9cdcfbf","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"6ef5ed7a892ff6165fa5da7396559bd6","column_type":2,"filter_combine_component":false,"id":"b5022045-e849-4ace-817a-90ec28b26437","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"column_id":"e5e2ac7000677b9ace23f4af6291644b","column_type":2,"filter_combine_component":false,"id":"cca964c4-37ff-4a67-8946-7fca5a1c85fd","need_count":false,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],"id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f","is_export_asset_property":true,"is_export_table_id":false,"is_show":true,"is_show_page":true,"last_modifier":"637806db-ab32-caee-c7b9-0519cd87e436","last_modify_time":1620956635000,"max_write_times":0,"modeColumnList":[],"open_pagination":true,"order_number_display":true,"orders":[],"overview_data":"[]","page_style_type":2,"query_type":0,"show_name":"江苏百展客","timeline_content":"{\"content\":\"\",\"values\":[]}","tree_parent_column":"单行文本,aea00dac5303bd57a3ed03503f867f7b","update_unique":1,"variables":[{"id":"0930c736-261b-4c49-a401-fe0fac5550a6","variable_data_type":8,"variable_name":"fff","variable_num_value":5.0,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"66745d6b-9159-453b-b79c-c6c7165506b0","variable_data_type":6,"variable_date_value":1619452800000,"variable_name":"eee","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"9bd2c5cb-5a11-4a7c-a537-583551c73c92","variable_data_type":0,"variable_name":"ddd","variable_str_value":"55","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"a58a4e58-e4bf-49e2-8c4b-29807b4c5126","variable_data_type":0,"variable_name":"444","variable_str_value":"666","view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"},{"id":"af57d1a4-6963-4db2-aeee-0686b3ced25d","variable_data_type":8,"variable_name":"555","variable_num_value":777.0,"view_id":"0a7661ae-40ee-4dc0-b4de-0f0af2a52a6f"}],"view_alias":"详情333","view_detail_mode":"0","view_list_mode":"1","view_name":"江苏百展客_业务流"},"status":200}
            var a=old.result
            var b=_new.result
            const key_a = Object.keys(a);
            const key_b = Object.keys(b);
            const 在a中不在b中的键=key_a.filter(i=>key_b.indexOf(i)<0)
            const 在b中不在a中的键=key_b.filter(i=>key_a.indexOf(i)<0)
            const 相同键但不相同值=key_a.reduce((prev,curr)=>{
                if(typeof b[curr]=='object'||typeof b[curr]=='undefined') return prev
                if(key_b.indexOf(curr)>=0&&a[curr]!=b[curr])return prev.concat(curr)
                else return prev
            },[])
            const 展示在a中不在b中的键值对=在a中不在b中的键.map(i=>i+":"+a[i])
            const 展示在b中不在a中的键值对=在b中不在a中的键.map(i=>i+":"+b[i])
            const 展示相同键但不相同值a=相同键但不相同值.map(i=>a[i])
            const 展示相同键但不相同值b=相同键但不相同值.map(i=>b[i])
            console.log(展示在a中不在b中的键值对)
            console.log(展示在b中不在a中的键值对)
            console.log(相同键但不相同值);
            console.log(展示相同键但不相同值a)
            console.log(展示相同键但不相同值b)
        }
    },
    created () {
    }
}
</script>

<style lang="scss">
    .view {
        i{
            color:red;
            font-style: normal;
            margin-right:6px;
        }
        .flex-row{
            display: flex;
            flex-direction: row;
        }
        .flex-col{
            display: flex;
            flex-direction: column;
        }
        .align-center{
            align-items: center;
        }
        .button{                
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 30px;
            background: #e3eef8;
            border: 1px solid #5182e4;
            border-radius: 3px;
            color: #5182e4;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            cursor: pointer;
        }
        width: 100%;
        padding: 50px;
        background-color: #f0f2f5;
        .view-button {
            margin-top: 20px;
        }
        .form_functionality{
            .align-center{
                align-items: center;
            }
            display: flex;
            flex-direction: row;
            div:first-child{
                margin-right: 20px;
            }
            .el-input{
                width:100px;
            }
            .top{
                margin-top:42px;
            }
        }
        .form_other{
            font-size:14px;
            margin-top:42px;
        }
        .total_count{
            font-size: 14px;
            color:#999;
            .el-input{
                width:300px;
            }
        }
        .export{
            .el-input{
                width:100px;
            }
        }
        .condition-list-box{
            min-height: 200px;
            max-height: 368px;
            border: 1px solid rgb(235, 235, 235);
            padding: 10px 16px;
            overflow-y: auto;
            margin: 20px 0px;
            .el-input{
                margin:0 20px 10px 0;
                width:150px;
            }
        }
        .button-config{
            .el-input{
                margin:0 10px 0;
                width:150px;
            }
        }
.card-response-mode {
  .head {
    .el-input {
      width: 780px;
    }
  }
}
.display_condition{
    padding:14px;
    background: #f9f9f9;
    margin:20px 0 0 0;
    .el-input{
        width:120px;
        margin-right:10px;
    }
    .compareObj{
        display: inline-block;
        .el-input{
            width:200px;
        }

    }
}
.routerShow{
    .el-dialog__body{
        font-size: 16px;
    }
    .el-input{
        width:700px;
        margin: 0 0 0 30px;
    }
}
    }
</style>
