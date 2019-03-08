<template>
    <Card>
        <Row>
            <Upload :data="importDatas" multiple type="drag" action="/api/import/importFileService/1.0.0">
                <div style="padding: 20px 0">
                    <Icon type="upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽进行文件上传</p>
                </div>
            </Upload>
        </Row>
    </Card>
</template>

<script>
import guid from '@/libs/guid'
import formatter from '@/libs/formatter'
export default {
  data() {
    return {
      importDatas: {
        requestId: guid.genGUID(),
        requestTime: formatter.dateTimeFormat(),
        channel: 'litou-aaa'
      }
    }
  },
  methods: {}
}
</script>