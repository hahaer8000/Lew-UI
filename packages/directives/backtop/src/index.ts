/*
 * @Author: Kamtao
 * @Date: 2022-07-04 12:15:55
 * @LastEditTime: 2022-07-07 17:37:21
 * @Description:
 */
import { shallowRef } from 'vue';

let _toBackUp;
export default {
    install(app: any) {
        app.directive('backtop', {
            mounted(el: any, binding: any) {
                const _target = binding.value;
                const dom = shallowRef<HTMLElement>();
                dom.value = document.documentElement;

                if (_target) {
                    dom.value =
                        document.querySelector<HTMLElement>(`.${_target}`) ??
                        undefined;
                    if (!dom.value) {
                        throw new Error(`target is not existed: ${_target}`);
                    }
                }

                _toBackUp = () => {
                    console.log(1);
                    if (!dom.value) return;
                    const timer = setInterval(() => {
                        const scrollDom: any = dom.value;
                        const ispeed = Math.floor(-scrollDom.scrollTop / 5);
                        scrollDom.scrollTop = scrollDom.scrollTop + ispeed;
                        if (scrollDom.scrollTop === 0) {
                            clearInterval(timer);
                        }
                    }, 20);
                };
                el.addEventListener('click', _toBackUp);
            },
            unmounted(el) {
                el.removeEventListener('click', _toBackUp);
            },
        });
    },
};
