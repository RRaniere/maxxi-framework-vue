<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Network' });
const breadcrumbs = shallowRef([
    {
        title: 'Network',
        disabled: true,
        href: '#'
    }
]);

import './styles/base.css';
import './styles/small-mobile.css';
import './styles/mobile.css';
import './styles/small.css';
import './styles/medium.css';
import './styles/large.css';
import './styles/extra-large.css';

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <div class="d-flex justify-center pb-8 mb-8">
        <div class="tree">
            <ul>
                <li>
                    <a ></a>
                    <ul>
                        <li>
                            <a ></a>
                            <ul>
                                <li>
                                    <a ></a>
                                    <ul>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>

                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>

                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a ></a>
                                    <ul>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>

                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>

                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a ></a>
                            <ul>
                                <li>
                                    <a ></a>
                                    <ul>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>

                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a ></a>
                                    <ul>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a ></a>
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                                <li>
                                                    <a  class="level-5"></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<style scoped>

</style>