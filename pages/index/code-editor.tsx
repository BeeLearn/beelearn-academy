import { Tab, TabGroup, TabPanels, TabList, TabPanel } from "@headlessui/vue";

import aiIcon from "~/assets/illustrations/ai.svg";

import CodeEditor from "~/components/CodeEditor.vue";
import CodeEditorProblem from "~/components/CodeEditorProblem.vue";
import CodeEditorResult from "~/components/CodeEditorResult.vue";

export default function CodeEditorPage() {
    const tabs = ref({
        'Problem': <CodeEditorProblem />,
        'Code': <CodeEditor />,
        'Result': <CodeEditorResult />,
    });

    const router = useRouter();
    const selectedTabIndex = ref(0);

    return (
        <main
            class="fixed inset-0 flex flex-col bg-black/50 z-10"
            md="items-end">
            <div
                class="flex-1 flex flex-col bg-white overflow-y-scroll"
                md="w-md">
                <header class="flex space-x-2 p-2 shadow">
                    <div class="flex-1 flex space-x-2 max-w-56 items-center">
                        <button 
                            class="p-2"
                            onClick={() => router.back()}>
                            <UnoIcon class="i-mdi:close text-xl" />
                        </button>
                        <p class="text-base">My first code couch! </p>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <button class="flex space-x-2 center py-1 px-4 bg-sky-500 text-white rounded">
                            <img src={aiIcon} />
                            <span>Use AI</span>
                        </button>
                        <button class="flex space-x-2 center py-2 px-4 btn-inverse rounded">
                            <span>Run</span>
                            <UnoIcon class="i-mdi:play text-xl" />
                        </button>
                    </div>
                </header>
                <TabGroup
                    as="div"
                    class="flex-1 flex flex-col overflow-y-scroll"
                    onChange={(index) => selectedTabIndex.value = index}>
                    <TabList class="flex space-x-4 px-4">
                        {
                            Object.keys(tabs.value).map((tab, index) => (
                                <Tab
                                    key={index}
                                    class={selectedTabIndex.value === index ? 'border-b-3 border-purple-700 text-purple-700 p-2' : 'p-2'}>
                                    {tab}
                                </Tab>
                            ))
                        }
                    </TabList>
                    <TabPanels class={"flex-1 bg-slate-100 overflow-y-scroll ".concat(selectedTabIndex.value !== 1 ? 'p-4' : '')}>
                        {
                            Object.values(tabs.value).map((tab, index) => (
                                <TabPanel
                                    key={index}
                                    as="fragment">
                                    {tab}
                                </TabPanel>
                            ))
                        }
                    </TabPanels>
                </TabGroup>
            </div>
        </main>
    );
}