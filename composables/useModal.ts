import type { IModalProps } from '~/types/modal';

export function useModal(props: IModalProps) {
    const classList = computed(() => [
        `--${props.size}-size`,
        props.isVisible ? '--is-visible' : '--is-hidden',
    ]);

    return {
        classList,
    };
}
