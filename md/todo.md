# todo
- 健壮性 不能操作时，报错体系
- haveTable('a,b') 检查是否有这些表 返回值{all_have:true,have:['a','b'],not_have:[]}
- config
    - ✅page,limit
    - sort
    - field
- db(db_name).next(next_token) 翻页
- allStream.js
    - 流程
        - i.r
        - t.r
        - i.d
        - t.d
        - t.c
        - i.c
        - r.c
        - r.r
        - r.u
        - r.d
    - u() 逻辑优化
    - getLastSql
    - 数据解析简化设置

# 半完成


# 已完成

- ✅假删除设置
    - ✅是否允许单独开启真删除
    - ✅设置删除后的垃圾箱
    - ✅查询时，自动过滤 _del:true
    - ✅创建索引时，自动加上 _del