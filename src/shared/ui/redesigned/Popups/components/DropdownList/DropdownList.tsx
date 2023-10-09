import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import ArrowDown from '@/shared/assets/icons/arrow-down-16x16.svg';

interface DropdownListProps<T> {
    className?: string;
    items: Array<T>;
    displayField: string;
}

export function DropdownList<T>(props: DropdownListProps<T>) {
    const { className, items, displayField } = props;
    const [selected, setSelected] = useState(items[0]);
    const [query, setQuery] = useState('');

    const filteredPeople = query === ''
        ? items
        : items.filter((item: T) => (item[displayField as keyof T] as string)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')));

    return (
        <div className="">
            <Combobox value={selected} onChange={setSelected}>
                <div className="">
                    <div className="">
                        <Combobox.Input
                            className=""
                            displayValue={(item: T) => (item[displayField as keyof T] as string)}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="">
                            <ArrowDown />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((item) => (
                                    <Combobox.Option
                                        key={item['id' as keyof T] as number}
                                        className=""
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className=""
                                                >
                                                    {item[displayField as keyof T] as string}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className=""
                                                    >
                                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                        !
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
