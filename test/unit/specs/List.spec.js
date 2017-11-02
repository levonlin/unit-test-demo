import Vue from 'vue'
import List from '@/components/List'

describe('List init data', function() {
    it('should init without item', function() {
        const vm = new Vue(List)
        expect(vm.$data.list.length).to.equal(0)
    })
})

describe('List render results', () => {
    const Constructor = Vue.extend(List)

    // 测试渲染后的组件实例
    it('should render correct contents', () => {
        const vm = new Constructor().$mount()
        expect(vm.$el.textContent).to.contain('sleep')
    })

    // 测试渲染后DOM更新
    it('should add new item', (done) => {
        const vm = new Constructor().$mount()
        const button = vm.$el.querySelector('button')

        // 模拟输入
        vm.newItem = 'brush teeth'
        const clickEvent = new window.Event('click')
        button.dispatchEvent(clickEvent)

        Vue.nextTick(() => {
            expect(vm.$el.textContent).to.contain('brush teeth')
            done()
        })
    })
})

// import { mount } from 'avoriaz';

// describe('List render results', () => {
//     // 测试渲染后的组件实例
//     it('should render correct contents', () => {
//         const wrapper = mount(List)
//         expect(wrapper.text()).to.contain('sleep')
//     })

//     // 测试渲染后DOM更新
//     it('should add new item', () => {
//         const wrapper = mount(List)
//         const button = wrapper.find('button')[0]

//         // 模拟输入，forceUpdate
//         wrapper.data().newItem = 'brush teeth'
//         button.trigger('click')

//         expect(wrapper.text()).to.contain('brush teeth')
//     })
// })

// describe('xhr', function() {
//     let server = null;

//     function getCommentsFor(url, cb, done) {
//         const xhr = new XMLHttpRequest()
//         xhr.addEventListener('load', function(e) {
//             cb()
//             done()
//         });
//         xhr.open('GET', url)
//         xhr.send()
//     }

//     beforeEach(() => {
//         server = sinon.fakeServer.create()
//     })

//     afterEach(() => {
//         server = sinon.restore()
//     })

//     it('should fetch comments from server', function(done) {
//         server.respondWith("GET", "/some/article/comments.json",
//                     [200, { "Content-Type": "application/json" },
//                      '[{ "id": 12, "comment": "Hey there" }]'])

//         var callback = sinon.spy()
//         getCommentsFor("/some/article", callback, done)
//         server.respond()

//         sinon.assert.calledWith(callback, [{ id: 12, comment: "Hey there" }])
//         expect(server.requests.length > 0).to.be.ok
//     });
// });