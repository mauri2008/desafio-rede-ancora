import { Skeleton, Stack } from '@mui/material';

interface ISkeletons {
    skeleton?: number;
}

export function Skeletons({ skeleton }: ISkeletons) {
    const listSkeleton = new Array(skeleton ?? 0).fill(0);

    return (
        <Stack gap={5} mt={3}>
            <Stack direction='row' width='100%' flexWrap='wrap' gap={2}>

                {
                    listSkeleton.map((_, index) =>
                        <Stack
                            key={`skeleton-${index}`}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: '100%',
                                    md: '100%',
                                    lg: 300,
                                    xl: 'calc(100vw / 6.7)',
                                },
                                height: '100%'

                            }}
                        >
                            <Skeleton variant="rectangular" width='100%' height={200} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />

                        </Stack>
                    )
                }



            </Stack>
        </Stack>
    );
}
