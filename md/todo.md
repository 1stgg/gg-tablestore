
# todo


- config
    - ✅page,limit
    - sort
    - field
- db(db_name).next(next_token) 翻页
- allStream.js
    - ✅流程
    - 数据解析简化设置
    - getLastSql
    - 健壮性 不能操作时，报错体系
    - u() 逻辑优化
    - u() inc,dec等

# 半完成


# 已完成
- ✅haveTable('a,b') 检查是否有这些表 返回值{all_have:true,have:['a','b'],not_have:[]}
- ✅假删除设置
    - ✅是否允许单独开启真删除
    - ✅设置删除后的垃圾箱
    - ✅查询时，自动过滤 _del:true
    - ✅创建索引时，自动加上 _del